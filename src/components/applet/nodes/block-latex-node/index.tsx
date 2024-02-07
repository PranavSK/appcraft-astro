import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import {
  GridCell,
  createGridCellStateScheme
} from '@/components/applet/nodes/grid-node/grid-cell'
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

const defaultLatex = String.raw`
    \begin{aligned}
        \text{minimize}     & \quad \sum_{i=1}^n c_i x_i \\
        \text{subject to}   & \quad \sum_{i=1}^n a_{ij} x_i \leq b_j, \quad j=1,\ldots,m \\
                            & \quad x_i \geq 0, \quad i=1,\ldots,n
    \end{aligned}
`
const stateSchema = createGridCellStateScheme({
  columnEnd: 5,
  columnStart: 1,
  rowEnd: 5,
  rowStart: 4
}).extend({
  latex: withMetadata(
    z.string().superRefine(getZodValidateLatex(true)).default(defaultLatex),
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
      <GridCell
        ref={(element) =>
          createRenderEffect(() => {
            katexApi.render(state.latex, element, {
              displayMode: true
            })
          })
        }
        state={state}
      />
    </ErrorBoundary>
  )
}
// Use directive not working so instead used a ref callback.

export { component, stateSchema }
