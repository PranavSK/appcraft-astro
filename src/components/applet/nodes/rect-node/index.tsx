import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import {
  GridCell,
  createGridCellStateScheme
} from '@/components/applet/nodes/grid-node/grid-cell'
import { withMetadata, zodColor } from '@/lib/zod'

const stateSchema = createGridCellStateScheme({
  columnEnd: 6,
  columnStart: 0,
  rowEnd: 6,
  rowStart: 0
}).extend({
  borderColor: withMetadata(zodColor.default('#1A1A1A'), {
    description: 'Enter the border color.',
    label: 'Border Color'
  }),
  fillColor: withMetadata(zodColor.default('#C7C7C7'), {
    description: 'Enter the fill color.',
    label: 'Fill Color'
  })
})

const component: Component<AppletNodeRenderProps> = (props) => {
  const [state] = useBlackboard(() => props.id, stateSchema)

  return (
    <GridCell
      class='rounded-xl border-[0.25rem]'
      state={state}
      style={{
        'background-color': state.fillColor,
        'border-color': state.borderColor
      }}
    />
  )
}

export { component, stateSchema }
