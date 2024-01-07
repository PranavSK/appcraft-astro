import { defineCollection, z } from 'astro:content'

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional()
})

const slide = defineCollection({
  type: 'content',
  schema: baseSchema
})

export const collections = {
  slide
}
