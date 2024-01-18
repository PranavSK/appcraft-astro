import type { AppRouter } from '@/lib/trpc/server/router'

import { createTRPCClient, httpBatchLink } from '@trpc/client'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''
  return `http://localhost:${process.env.PORT ?? 4321}`
}

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`
    })
  ]
})
