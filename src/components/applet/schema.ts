import { jsonSchema } from '@/lib/zod'
import { z } from 'zod'

const baseAppletElement = z.object({
  groups: z.array(z.string().min(1)).optional(),
  id: z.literal('root').or(z.string().min(10)),
  initialState: z.record(jsonSchema).optional()
})
export type AppletSchemaNode = z.infer<typeof baseAppletElement> & {
  children?: Array<AppletSchemaNode>
}
const appletElement: z.ZodType<AppletSchemaNode> = baseAppletElement.extend({
  children: z.lazy(() => z.array(appletElement)).optional()
})
export const appletSchema = z.object({
  children: z.array(appletElement),
  id: z.literal('root')
})
export type AppletSchemaRoot = z.infer<typeof appletSchema>
