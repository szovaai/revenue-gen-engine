import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { TEMPLATES } from '@/lib/email-templates/registry'

// Configuration mirrors src/routes/lovable/email/transactional/send.ts
const SITE_NAME = 'revenue-gen-engine'
const SENDER_DOMAIN = 'notify.clickadmedia.co'
const FROM_DOMAIN = 'notify.clickadmedia.co'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Server-side transactional email sender for internal callers (webhooks,
 * server functions) that don't have a Supabase user JWT. Renders the
 * template and enqueues it the same way the /lovable/email/transactional/send
 * route does, but skipping the user-auth check.
 *
 * Returns true if enqueued, false on suppression or error (errors are
 * logged but never thrown — callers should not block on email failures).
 */
export async function sendTransactionalEmail(input: {
  templateName: string
  recipientEmail?: string
  templateData?: Record<string, unknown>
  idempotencyKey?: string
}): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    console.error('[email] missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
    return false
  }

  const template = TEMPLATES[input.templateName]
  if (!template) {
    console.error('[email] unknown template', input.templateName)
    return false
  }

  const effectiveRecipient = template.to ?? input.recipientEmail
  if (!effectiveRecipient) {
    console.error('[email] no recipient for', input.templateName)
    return false
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const normalizedEmail = effectiveRecipient.toLowerCase()
  const messageId = crypto.randomUUID()
  const idempotencyKey = input.idempotencyKey ?? messageId

  // Suppression check
  const { data: suppressed } = await supabase
    .from('suppressed_emails')
    .select('email')
    .eq('email', normalizedEmail)
    .maybeSingle()
  if (suppressed) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: input.templateName,
      recipient_email: effectiveRecipient,
      status: 'suppressed',
    })
    return false
  }

  // Get-or-create unsubscribe token
  let unsubscribeToken: string | null = null
  const { data: existingToken } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalizedEmail)
    .maybeSingle()
  if (existingToken && !existingToken.used_at) {
    unsubscribeToken = existingToken.token as string
  } else if (!existingToken) {
    const newToken = generateToken()
    await supabase
      .from('email_unsubscribe_tokens')
      .upsert({ email: normalizedEmail, token: newToken }, { onConflict: 'email', ignoreDuplicates: true })
    const { data: storedToken } = await supabase
      .from('email_unsubscribe_tokens')
      .select('token')
      .eq('email', normalizedEmail)
      .maybeSingle()
    unsubscribeToken = (storedToken?.token as string | undefined) ?? newToken
  }

  // Render
  const data = input.templateData ?? {}
  const element = React.createElement(template.component as any, data)
  const html = await render(element)
  const plainText = await render(element, { plainText: true })
  const subject = typeof template.subject === 'function' ? template.subject(data) : template.subject

  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: input.templateName,
    recipient_email: effectiveRecipient,
    status: 'pending',
  })

  const { error: enqueueError } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text: plainText,
      purpose: 'transactional',
      label: input.templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })

  if (enqueueError) {
    console.error('[email] enqueue failed', input.templateName, enqueueError)
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: input.templateName,
      recipient_email: effectiveRecipient,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    return false
  }
  return true
}
