import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  business?: string
  email?: string
  phone?: string
  trade?: string
  website?: string
  pkg?: string
  budget?: string
  details?: string
}

const ProjectInquiry = ({
  name = 'unknown', business = 'unknown', email = 'unknown', phone = 'unknown',
  trade = 'unknown', website = '', pkg = 'unknown', budget = '', details = '',
}: Props) => (
  <Html lang="en">
    <Head />
    <Preview>New project inquiry from {name} ({business})</Preview>
    <Body style={body}>
      <Container style={container}>
        <Heading style={h1}>New Project Inquiry</Heading>
        <Text style={row}><strong>Name:</strong> {name}</Text>
        <Text style={row}><strong>Business:</strong> {business}</Text>
        <Text style={row}><strong>Trade:</strong> {trade}</Text>
        <Text style={row}><strong>Email:</strong> {email}</Text>
        <Text style={row}><strong>Phone:</strong> {phone}</Text>
        <Text style={row}><strong>Existing website:</strong> {website || 'none'}</Text>
        <Text style={row}><strong>Package:</strong> {pkg}</Text>
        <Text style={row}><strong>Budget:</strong> {budget || 'not given'}</Text>
        <Hr style={hr} />
        <Text style={row}><strong>Project details:</strong> {details}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ProjectInquiry,
  subject: ({ name, pkg }: Props) => `Project inquiry: ${name ?? 'unknown'} — ${pkg ?? ''}`.trim(),
  displayName: 'Owner: project inquiry',
  to: 'support@jasonrszova.com',
  previewData: {
    name: 'Jane Smith', business: "Smith's Plumbing", email: 'jane@example.com', phone: '(555) 123-4567',
    trade: 'Plumbing', website: '', pkg: 'Premium Trade Website — $997', budget: '$1,000–$2,500', details: 'Need a new site.',
  },
} satisfies TemplateEntry

const body = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }
const h1 = { fontSize: '22px', fontWeight: 800, color: '#0a0a0a', margin: '0 0 20px' }
const row = { fontSize: '15px', lineHeight: '22px', color: '#1a1a1a', margin: '0 0 8px' }
const hr = { borderColor: '#eaeaea', margin: '20px 0' }
