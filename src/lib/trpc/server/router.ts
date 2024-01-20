import { type inferRouterInputs, initTRPC } from '@trpc/server'
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
  cms: t.router({
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
          await writeFile(destination, content)
        } else {
          throw new Error('Not implemented')
        }
      })
  })
})
export type AppRouter = typeof appRouter
type RouterInput = inferRouterInputs<AppRouter>

export type SaveInput = RouterInput['cms']['save']
