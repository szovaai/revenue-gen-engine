import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/unsubscribe')({
  head: () => ({
    meta: [
      { title: 'Unsubscribe — ClickAdMedia' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === 'string' ? search.token : undefined,
  }),
  component: UnsubscribePage,
})

type State =
  | { kind: 'loading' }
  | { kind: 'valid' }
  | { kind: 'already' }
  | { kind: 'invalid' }
  | { kind: 'submitting' }
  | { kind: 'done' }
  | { kind: 'error'; message: string }

function UnsubscribePage() {
  const { token } = Route.useSearch()
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    if (!token) {
      setState({ kind: 'invalid' })
      return
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const j = await r.json()
        if (!r.ok) return setState({ kind: 'invalid' })
        if (j.valid === true) return setState({ kind: 'valid' })
        if (j.reason === 'already_unsubscribed') return setState({ kind: 'already' })
        setState({ kind: 'invalid' })
      })
      .catch(() => setState({ kind: 'error', message: 'Could not validate token' }))
  }, [token])

  const confirm = async () => {
    if (!token) return
    setState({ kind: 'submitting' })
    try {
      const r = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const j = await r.json()
      if (j.success || j.reason === 'already_unsubscribed') return setState({ kind: 'done' })
      setState({ kind: 'error', message: j.error ?? 'Failed to unsubscribe' })
    } catch (e) {
      setState({ kind: 'error', message: e instanceof Error ? e.message : 'Network error' })
    }
  }

  return (
    <section className="pt-32 pb-20 px-6 min-h-dvh">
      <div className="max-w-[520px] mx-auto rounded-xl border border-[rgba(255,255,255,0.1)] p-8 bg-[rgba(255,255,255,0.02)] text-center">
        <h1 className="text-2xl font-extrabold mb-4">Email preferences</h1>
        {state.kind === 'loading' && <p className="text-[rgba(255,255,255,0.6)]">Checking your link…</p>}
        {state.kind === 'invalid' && <p className="text-[rgba(255,255,255,0.7)]">This unsubscribe link is invalid or expired.</p>}
        {state.kind === 'already' && <p className="text-[rgba(255,255,255,0.7)]">You're already unsubscribed. No further action needed.</p>}
        {state.kind === 'valid' && (
          <>
            <p className="text-[rgba(255,255,255,0.75)] mb-6">
              Click the button below to stop receiving emails from ClickAdMedia / Jason R Szova Consulting.
            </p>
            <button onClick={confirm} className="btn-primary">Confirm unsubscribe</button>
          </>
        )}
        {state.kind === 'submitting' && <p className="text-[rgba(255,255,255,0.6)]">Unsubscribing…</p>}
        {state.kind === 'done' && <p className="text-[rgba(255,255,255,0.85)]">You've been unsubscribed. Sorry to see you go.</p>}
        {state.kind === 'error' && <p className="text-red-400">{state.message}</p>}
      </div>
    </section>
  )
}
