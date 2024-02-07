import { withMetadata } from '@/lib/zod'
import { z } from 'zod'

const stateSchema = z.object({
  active: withMetadata(z.boolean(), {}).default(true),
  name: withMetadata(z.string(), {})
})
export { stateSchema }
