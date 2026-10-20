import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  business?: string
  phone?: string
  email?: string
  businessType?: string
  callVolume?: string
  callHandling?: string
  details?: string
}

const AiReceptionistInquiry = ({
  name = 'unknown',
  business = 'unknown',
  phone = 'unknown',
  email = 'unknown',
  businessType = 'unknown',
  callVolume = '',
  callHandling = 'unknown',
  details = '',
}: Props) => (
  <Html lang="en">
    <Head />
    <Preview>New AI Receptionist inquiry from {name} ({business})</Preview>
    <Body style={body}>
      <Container style={container}>
        <Heading style={h1}>New AI Receptionist Inquiry</Heading>
        <Text style={row}><strong>Name:</strong> {name}</Text>
        <Text style={row}><strong>Business:</strong> {business}</Text>
        <Text style={row}><strong>Business type:</strong> {businessType}</Text>
        <Text style={row}><strong>Email:</strong> {email}</Text>
        <Text style={row}><strong>Phone:</strong> {phone}</Text>
        <Text style={row}><strong>Monthly call volume:</strong> {callVolume || 'not given'}</Text>
        <Text style={row}><strong>Preferred call handling:</strong> {callHandling}</Text>
        <Hr style={hr} />
        <Text style={row}><strong>Details:</strong> {details || 'none'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AiReceptionistInquiry,
  subject: ({ name, business }: Props) =>
    `AI Receptionist inquiry: ${name ?? 'unknown'} — ${business ?? ''}`.trim(),
  displayName: 'Owner: AI receptionist inquiry',
  to: 'support@jasonrszova.com',
  previewData: {
    name: 'Jane Smith',
    business: "Smith's Plumbing",
    phone: '(555) 123-4567',
    email: 'jane@smithsplumbing.com',
    businessType: 'Plumber',
    callVolume: '100-250',
    callHandling: 'Missed calls only',
    details: 'Want after-hours coverage.',
  },
} satisfies TemplateEntry

const body = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }
const h1 = { fontSize: '22px', fontWeight: 800, color: '#0a0a0a', margin: '0 0 20px' }
const row = { fontSize: '15px', lineHeight: '22px', color: '#1a1a1a', margin: '0 0 8px' }
const hr = { borderColor: '#eaeaea', margin: '20px 0' }
