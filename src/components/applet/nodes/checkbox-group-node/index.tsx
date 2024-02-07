import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import {
  GridCell,
  createGridCellStateScheme
} from '@/components/applet/nodes/grid-node/grid-cell'
import { cva } from '@/lib/utils'

const children = ['checkbox-group-item']

const stateSchema = createGridCellStateScheme({
  columnEnd: 3,
  columnStart: 2,
  rowEnd: 5,
  rowStart: 4
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
  const [state] = useBlackboard(() => props.id, stateSchema)
  const orientation = () => {
    const { columnEnd, columnStart, rowEnd, rowStart } = state
    return rowEnd - rowStart > columnEnd - columnStart
      ? 'vertical'
      : 'horizontal'
  }
  return (
    <GridCell
      class={containerVariants({ orientation: orientation() })}
      state={state}
    >
      {props.children}
    </GridCell>
  )
}

export { children, component, stateSchema }
