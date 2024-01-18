import { initTRPC } from '@trpc/server'
import { z } from 'zod'

import type { Context } from './context'

export const t = initTRPC.context<Context>().create()
export const middleware = t.middleware
export const publicProcedure = t.procedure

// const isAdmin = middleware(async ({ ctx, next }) => {
//   if (!ctx.user?.isAdmin) {
//     throw new TRPCError({ code: 'UNAUTHORIZED' })
//   }

//   return next({
//     ctx: {
//       user: ctx.user
//     }
//   })
// })

export const adminProcedure = publicProcedure //.use(isAdmin)

export const appRouter = t.router({
  save: adminProcedure
    .input(
      z.object({
        collection: z.string().min(1),
        content: z.string(),
        ext: z.string().min(1),
        slug: z.string().min(1)
      })
    )
    .mutation(async ({ input }) => {
      const { collection, content, ext, slug } = input
      if (import.meta.env.DEV) {
        const { dirname, resolve } = await import('path')
        const { fileURLToPath } = await import('url')
        const { writeFile } = await import('fs/promises')
        const destination = resolve(
          dirname(fileURLToPath(import.meta.url)),
          `../../../content/${collection}`,
          `${slug}.${ext.startsWith('.') ? ext.slice(1) : ext}`
        )

        try {
          await writeFile(destination, content)
          return { error: null, status: 'success' }
        } catch (error) {
          if (error instanceof Error)
            return { error: error.message, status: 'error' }
          else return { error: 'Unknown error', status: 'error' }
        }
      } else {
        return { error: 'Not implemented', status: 'error' }
      }
    })
})
export type AppRouter = typeof appRouter
