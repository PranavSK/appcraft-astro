import type { ValidComponent } from 'solid-js'

import { Document, Page } from '@/components/full-page'

export const components: Record<string, ValidComponent> = {
  'full-page-document': Document,
  'full-page-page': Page
}
