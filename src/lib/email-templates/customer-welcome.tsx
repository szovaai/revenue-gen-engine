import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  customerEmail?: string
  productLabel?: string
  amountFormatted?: string
  kind?: 'subscription' | 'one_time'
}

const CustomerWelcome = ({
  customerEmail,
  productLabel = 'your new plan',
  amountFormatted,
  kind = 'subscription',
}: Props) => (
  <Html lang="en">
    <Head />
    <Preview>Thanks for your purchase — here's what happens next</Preview>
    <Body style={body}>
      <Container style={container}>
        <Heading style={h1}>Welcome aboard 👋</Heading>
        <Text style={text}>
          Thanks for purchasing <strong>{productLabel}</strong>
          {amountFormatted ? ` (${amountFormatted})` : ''}. Your account is active and you can sign in to your dashboard any time.
        </Text>
        <Section style={ctaSection}>
          <Link href="https://clickadmedia.co/dashboard" style={button}>
            Go to your dashboard
          </Link>
        </Section>
        <Text style={text}>
          <strong>What happens next</strong>
          <br />
          Jason will personally reach out within 1 business day to kick things off.
          In the meantime, you can book your strategy/kickoff call here:
        </Text>
        <Text style={text}>
          <Link href="https://clickadmedia.co/book-a-call" style={link}>
            Book your kickoff call →
          </Link>
        </Text>
        {kind === 'subscription' && (
          <Text style={muted}>
            You can manage your plan, payment method, and cancel any time from your dashboard under <em>Manage billing</em>.
          </Text>
        )}
        <Text style={muted}>
          Reply to this email with any questions — it goes straight to Jason.
        </Text>
        <Text style={signature}>
          — Jason R Szova
          <br />
          ClickAdMedia / Jason R Szova Consulting
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CustomerWelcome,
  subject: 'Welcome to ClickAdMedia — your account is active',
  displayName: 'Customer welcome',
  previewData: {
    customerEmail: 'jane@example.com',
    productLabel: 'Growth Plan ($297/mo)',
    amountFormatted: '$297.00 USD',
    kind: 'subscription',
  },
} satisfies TemplateEntry

const body = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }
const h1 = { fontSize: '24px', fontWeight: 800, color: '#0a0a0a', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '24px', color: '#1a1a1a', margin: '0 0 16px' }
const muted = { fontSize: '13px', lineHeight: '20px', color: '#666', margin: '16px 0 0' }
const signature = { fontSize: '14px', color: '#333', marginTop: '32px' }
const ctaSection = { textAlign: 'center' as const, margin: '24px 0' }
const button = {
  backgroundColor: '#00c6ff',
  color: '#000',
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: 700,
  textDecoration: 'none',
  display: 'inline-block',
}
const link = { color: '#0072ff', textDecoration: 'underline' }
