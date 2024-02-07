import type { Config } from '@markdoc/markdoc'
import type { ContentCollectionKey } from 'astro:content'

import { appletSchema } from '@/components/applet/schema'
import Markdoc from '@markdoc/markdoc'
import { defineCollection, z } from 'astro:content'

const baseContentSchema = z.object({
  description: z.string().optional(),
  title: z.string()
})
const slide = defineCollection({
  schema: baseContentSchema,
  type: 'content'
})

const author = defineCollection({
  schema: z.object({
    email: z.string().email(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
  }),
  type: 'data'
})

const applet = defineCollection({
  schema: appletSchema,
  type: 'data'
})

export const collections = {
  applet,
  author,
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
} satisfies Record<ContentCollectionKey, Config>
