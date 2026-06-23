import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  business?: string
  phone?: string
  email?: string
  industry?: string
}

const FreePreviewRequest = ({
  name = 'unknown',
  business = 'unknown',
  phone = 'unknown',
  email = 'unknown',
  industry = 'unknown',
}: Props) => (
  <Html lang="en">
    <Head />
    <Preview>New free preview request from {name} ({business})</Preview>
    <Body style={body}>
      <Container style={container}>
        <Heading style={h1}>🚀 New Free Preview Request</Heading>
        <Text style={row}><strong>Name:</strong> {name}</Text>
        <Text style={row}><strong>Business:</strong> {business}</Text>
        <Text style={row}><strong>Industry:</strong> {industry}</Text>
        <Text style={row}><strong>Email:</strong> {email}</Text>
        <Text style={row}><strong>Phone:</strong> {phone}</Text>
        <Hr style={hr} />
        <Text style={muted}>
          Reply within 24 hours with their free mockup to keep the promise on the site.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: FreePreviewRequest,
  subject: ({ name, business }: Props) =>
    `🚀 Free preview request: ${name ?? 'unknown'} — ${business ?? ''}`.trim(),
  displayName: 'Owner: free preview request',
  to: 'support@jasonrszova.com',
  previewData: {
    name: 'Jane Smith',
    business: "Smith's Plumbing",
    phone: '(555) 123-4567',
    email: 'jane@smithsplumbing.com',
    industry: 'Plumber',
  },
} satisfies TemplateEntry

const body = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }
const h1 = { fontSize: '22px', fontWeight: 800, color: '#0a0a0a', margin: '0 0 20px' }
const row = { fontSize: '15px', lineHeight: '22px', color: '#1a1a1a', margin: '0 0 8px' }
const hr = { borderColor: '#eaeaea', margin: '20px 0' }
const muted = { fontSize: '13px', color: '#666' }
