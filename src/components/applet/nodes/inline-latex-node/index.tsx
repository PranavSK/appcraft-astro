import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { getZodValidateLatex } from '@/lib/katex'
import { withMetadata } from '@/lib/zod'
import katexApi from 'katex'
import 'katex/dist/katex.min.css'
import { ErrorBoundary, createRenderEffect } from 'solid-js'
import { z } from 'zod'

const stateSchema = z.object({
  latex: withMetadata(
    z.string().default('\\LaTeX').superRefine(getZodValidateLatex(false)),
    {
      description: (
        <>
          Enter LaTex expression. See{' '}
          <a
            class='underline underline-offset-4'
            href='https://katex.org/docs/supported.html'
            rel='noreferrer'
            target='_blank'
          >
            KaTex Supported Functions
          </a>
          .
        </>
      ),
      label: 'LaTeX'
    }
  )
})

const component: Component<AppletNodeRenderProps> = (props) => {
  const [state] = useBlackboard(() => props.id, stateSchema)

  return (
    <ErrorBoundary
      fallback={(error) => {
        if (error instanceof katexApi.ParseError) {
          const latex = state.latex
          const pre = latex.slice(0, error.position)
          const post = latex.slice(error.position)
          return (
            <HoverCard>
              <HoverCardTrigger as='span' class='text-xs text-destructive'>
                {pre}
                <span class='underline decoration-wavy underline-offset-2'>
                  {post}
                </span>
              </HoverCardTrigger>
              <HoverCardContent class='bg-destructive text-destructive-foreground'>
                {error.message}
              </HoverCardContent>
            </HoverCard>
          )
        }
      }}
    >
      <span
        ref={(element) =>
          createRenderEffect(() => {
            katexApi.render(state.latex, element, {
              displayMode: false
            })
          })
        }
      />
    </ErrorBoundary>
  )
}

export { component, stateSchema }
