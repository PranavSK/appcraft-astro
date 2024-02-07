import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import {
  GridCell,
  createGridCellStateScheme
} from '@/components/applet/nodes/grid-node/grid-cell'
import { cva } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { As, RadioGroup } from '@kobalte/core'
import { createEffect, on } from 'solid-js'
import { z } from 'zod'

const children = ['radio-group-item']
const stateSchema = createGridCellStateScheme({
  columnEnd: 3,
  columnStart: 2,
  rowEnd: 5,
  rowStart: 4
}).extend({
  onValueChange: withMetadata(z.string().optional(), {
    description: 'Enter javascript code that is run on selected value change.',
    label: 'On value change'
  }),
  value: withMetadata(z.coerce.string().optional(), {
    description: 'Controlled value of the selected item',
    label: 'Value'
  })
})

const containerVariants = cva({
  base: 'flex items-center justify-center space-y-2',
  defaultVariants: {
    orientation: 'horizontal'
  },
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    }
  }
})

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  const [state, { boundFunctions, setState }] = useBlackboard(
    () => props.id,
    stateSchema
  )
  const orientation = () => {
    const { columnEnd, columnStart, rowEnd, rowStart } = state
    return rowEnd - rowStart > columnEnd - columnStart
      ? 'vertical'
      : 'horizontal'
  }

  createEffect(
    on(() => state.value, boundFunctions.onValueChange, { defer: true })
  )

  const handleValueChange = (value: string) => {
    setState('value', value)
  }
  return (
    <GridCell asChild state={state}>
      <As
        class={containerVariants({ orientation: orientation() })}
        component={RadioGroup.Root}
        onChange={handleValueChange}
        value={state.value}
      >
        {props.children}
      </As>
    </GridCell>
  )
}

export { children, component, stateSchema }
