import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import {
  GridCell,
  createGridCellStateScheme
} from '@/components/applet/nodes/grid-node/grid-cell'
import { cva } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { z } from 'zod'

const children = [
  'text',
  'line-break',
  'inline-latex',
  'inline-image',
  'option',
  'button'
]

const stateSchema = createGridCellStateScheme({
  columnEnd: 6,
  columnStart: 0,
  rowEnd: 1,
  rowStart: 0
}).extend({
  textAlign: withMetadata(z.enum(['left', 'center', 'right']).default('left'), {
    description:
      'Choose the horizontal text alignment within the paragraph widget.',
    label: 'Text Align'
  })
})

const paragraphVariants = cva({
  defaultVariants: {
    textAlign: 'left'
  },
  variants: {
    textAlign: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right'
    }
  }
})

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  const [state] = useBlackboard(() => props.id, stateSchema)
  return (
    <GridCell as='div' class={paragraphVariants(state)} state={state}>
      {props.children}
    </GridCell>
  )
}

export { children, component, stateSchema }
