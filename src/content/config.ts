import type { Config } from '@markdoc/markdoc'

import Markdoc from '@markdoc/markdoc'
import { defineCollection, z } from 'astro:content'

const baseSchema = z.object({
  description: z.string().optional(),
  title: z.string()
})

const slide = defineCollection({
  schema: baseSchema,
  type: 'content'
})

export const collections = {
  slide
}

export const markdocConfigs = {
  slide: {
    nodes: {
      document: {
        ...Markdoc.nodes.document,
        render: 'full-page-document'
      }
    },
    tags: {
      slide: {
        render: 'full-page-page'
      }
    }
  }
} satisfies Record<keyof typeof collections, Config>
