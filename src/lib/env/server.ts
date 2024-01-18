import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  runtimeEnv: import.meta.env,
  server: {
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    GITHUB_OWNER: z.string().min(1),
    GITHUB_PROD_BRANCH: z.string().min(1),
    GITHUB_REPO: z.string().min(1)
  }
})
