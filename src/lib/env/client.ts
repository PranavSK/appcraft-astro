import { createEnv } from '@t3-oss/env-core'

export const env = createEnv({
  client: {},
  clientPrefix: 'PUBLIC_',
  runtimeEnv: import.meta.env
})
