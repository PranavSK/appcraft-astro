import type { APIRoute } from 'astro'

import { createContext } from '@/lib/trpc/server/context'
import { appRouter } from '@/lib/trpc/server/router'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

export const prerender = false

export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    createContext,
    endpoint: '/api/trpc',
    req: request,
    router: appRouter
  })
}
