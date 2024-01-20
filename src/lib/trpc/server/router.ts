import { deleteFiles, saveFile } from '@/lib/github'
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
    delete: adminProcedure
      .input(
        z.array(
          z.object({
            collection: z.string().min(1),
            extension: z.string().min(1),
            slug: z.string().min(1)
          })
        )
      )
      .mutation(async ({ input }) => {
        if (import.meta.env.DEV) {
          const { dirname, resolve } = await import('path')
          const { fileURLToPath } = await import('url')
          const { unlink } = await import('fs/promises')
          await Promise.all(
            input.map(async ({ collection, extension, slug }) => {
              const destination = resolve(
                dirname(fileURLToPath(import.meta.url)),
                `../../../content/${collection}`,
                `${slug}.${extension.startsWith('.') ? extension.slice(1) : extension}`
              )
              await unlink(destination)
            })
          )
        } else {
          await deleteFiles(input)
        }
      }),
    save: adminProcedure
      .input(
        z.object({
          body: z.string(),
          collection: z.string().min(1),
          extension: z.string().min(1),
          message: z.string().optional(),
          slug: z.string().min(1)
        })
      )
      .mutation(async ({ input }) => {
        if (import.meta.env.DEV) {
          const { body, collection, extension, slug } = input
          const { dirname, resolve } = await import('path')
          const { fileURLToPath } = await import('url')
          const { writeFile } = await import('fs/promises')
          const destination = resolve(
            dirname(fileURLToPath(import.meta.url)),
            `../../../content/${collection}`,
            `${slug}.${extension.startsWith('.') ? extension.slice(1) : extension}`
          )
          await writeFile(destination, body)
        } else {
          await saveFile(input)
        }
      })
  })
})
export type AppRouter = typeof appRouter
type RouterInput = inferRouterInputs<AppRouter>

export type SaveInput = RouterInput['cms']['save']
