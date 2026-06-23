import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'ClickAdMedia'
const SENDER_DOMAIN = 'notify.clickadmedia.co'
const FROM_DOMAIN = 'notify.clickadmedia.co'
const TEMPLATE_NAME = 'free-preview-request'

const inputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  business: z.string().trim().min(1).max(160),
  phone: z.string().trim().min(3).max(40),
  email: z.string().trim().email().max(255),
  industry: z.string().trim().min(1).max(80),
})

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const Route = createFileRoute('/api/public/free-preview-request')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let parsed
        try {
          parsed = inputSchema.parse(await request.json())
        } catch (err) {
          return Response.json({ error: 'Invalid input', details: (err as Error).message }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const template = TEMPLATES[TEMPLATE_NAME]
        const effectiveRecipient = template.to!
        const messageId = crypto.randomUUID()
        const idempotencyKey = `free-preview-${parsed.email.toLowerCase()}-${Date.now()}`

        // Suppression check
        const { data: suppressed } = await supabase
          .from('suppressed_emails')
          .select('id')
          .eq('email', effectiveRecipient.toLowerCase())
          .maybeSingle()
        if (suppressed) {
          return Response.json({ success: true })
        }

        // Unsubscribe token (reuse or create)
        const normalized = effectiveRecipient.toLowerCase()
        let unsubscribeToken: string
        const { data: existing } = await supabase
          .from('email_unsubscribe_tokens')
          .select('token, used_at')
          .eq('email', normalized)
          .maybeSingle()
        if (existing && !existing.used_at) {
          unsubscribeToken = existing.token
        } else {
          unsubscribeToken = generateToken()
          await supabase
            .from('email_unsubscribe_tokens')
            .upsert({ token: unsubscribeToken, email: normalized }, { onConflict: 'email', ignoreDuplicates: true })
          const { data: stored } = await supabase
            .from('email_unsubscribe_tokens')
            .select('token')
            .eq('email', normalized)
            .maybeSingle()
          if (stored?.token) unsubscribeToken = stored.token
        }

        const element = React.createElement(template.component, parsed)
        const html = await render(element)
        const text = await render(element, { plainText: true })
        const subject = typeof template.subject === 'function' ? template.subject(parsed) : template.subject

        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
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
            text,
            purpose: 'transactional',
            label: TEMPLATE_NAME,
            idempotency_key: idempotencyKey,
            unsubscribe_token: unsubscribeToken,
            reply_to: parsed.email,
            queued_at: new Date().toISOString(),
          },
        })

        if (enqueueError) {
          console.error('Failed to enqueue free preview request', enqueueError)
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: effectiveRecipient,
            status: 'failed',
            error_message: 'Failed to enqueue email',
          })
          return Response.json({ error: 'Failed to send' }, { status: 500 })
        }

        return Response.json({ success: true })
      },
    },
  },
})
