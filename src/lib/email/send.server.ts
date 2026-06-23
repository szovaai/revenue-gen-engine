/**
 * Server-side helper to enqueue a transactional email via the internal
 * /lovable/email/transactional/send route. Uses the service-role key so
 * it can be called from webhooks where there is no user session.
 */
export async function sendTransactionalEmail(input: {
  templateName: string
  recipientEmail: string
  templateData?: Record<string, unknown>
  idempotencyKey?: string
  origin: string
}): Promise<void> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    console.error('[email] SUPABASE_SERVICE_ROLE_KEY missing — skipping send', input.templateName)
    return
  }

  try {
    const res = await fetch(`${input.origin}/lovable/email/transactional/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        templateName: input.templateName,
        recipientEmail: input.recipientEmail,
        templateData: input.templateData ?? {},
        idempotencyKey: input.idempotencyKey,
      }),
    })
    if (!res.ok) {
      console.error('[email] send failed', input.templateName, res.status, await res.text())
    }
  } catch (e) {
    console.error('[email] send threw', input.templateName, e)
  }
}
