import type { ComponentType } from 'react'
import { template as customerWelcomeTemplate } from './customer-welcome'
import { template as newCustomerOwnerTemplate } from './new-customer-owner'
import { template as freePreviewRequestTemplate } from './free-preview-request'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'customer-welcome': customerWelcomeTemplate,
  'new-customer-owner': newCustomerOwnerTemplate,
  'free-preview-request': freePreviewRequestTemplate,
}

