import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  customerEmail?: string
  productLabel?: string
  amountFormatted?: string
  kind?: 'subscription' | 'one_time'
}

const NewCustomerOwner = ({
  customerEmail = 'unknown',
  productLabel = 'unknown product',
  amountFormatted,
  kind = 'subscription',
}: Props) => (
  <Html lang="en">
    <Head />
    <Preview>New customer: {customerEmail} — {productLabel}</Preview>
    <Body style={body}>
      <Container style={container}>
        <Heading style={h1}>🎉 New customer</Heading>
        <Text style={row}><strong>Email:</strong> {customerEmail}</Text>
        <Text style={row}><strong>Plan:</strong> {productLabel}</Text>
        {amountFormatted && <Text style={row}><strong>Amount:</strong> {amountFormatted}</Text>}
        <Text style={row}><strong>Type:</strong> {kind === 'subscription' ? 'Recurring subscription' : 'One-time payment'}</Text>
        <Hr style={hr} />
        <Text style={muted}>
          Recommend reaching out to {customerEmail} within 1 business day to start onboarding.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewCustomerOwner,
  subject: ({ customerEmail, productLabel }: Props) =>
    `🎉 New customer: ${customerEmail ?? 'unknown'} — ${productLabel ?? 'plan'}`,
  displayName: 'Owner: new customer notification',
  to: 'support@jasonrszova.com',
  previewData: {
    customerEmail: 'jane@example.com',
    productLabel: 'Growth Plan ($297/mo)',
    amountFormatted: '$297.00 USD',
    kind: 'subscription',
  },
} satisfies TemplateEntry

const body = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }
const h1 = { fontSize: '22px', fontWeight: 800, color: '#0a0a0a', margin: '0 0 20px' }
const row = { fontSize: '15px', lineHeight: '22px', color: '#1a1a1a', margin: '0 0 8px' }
const hr = { borderColor: '#eaeaea', margin: '20px 0' }
const muted = { fontSize: '13px', color: '#666' }
