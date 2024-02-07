import type { AsChildProp } from '@kobalte/core'
import type { Component, ComponentProps } from 'solid-js'

import { clamp } from '@/lib/math'
import { cx } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { Polymorphic } from '@kobalte/core'
import { splitProps } from 'solid-js'
import { z } from 'zod'

const TW_GRID_ROW_START_LIST = [
  'row-start-1',
  'row-start-2',
  'row-start-3',
  'row-start-4',
  'row-start-5',
  'row-start-6',
  'row-start-7'
]
const TW_GRID_ROW_END_LIST = [
  'row-end-1',
  'row-end-2',
  'row-end-3',
  'row-end-4',
  'row-end-5',
  'row-end-6',
  'row-end-7'
]
const TW_GRID_COL_START_LIST = [
  'col-start-1',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7'
]
const TW_GRID_COL_END_LIST = [
  'col-end-1',
  'col-end-2',
  'col-end-3',
  'col-end-4',
  'col-end-5',
  'col-end-6',
  'col-end-7'
]

interface GridCellProps {
  asChild?: boolean
  state: {
    columnEnd: number
    columnStart: number
    rowEnd: number
    rowStart: number
  }
}
export const GridCell: Component<
  GridCellProps & AsChildProp & ComponentProps<'div'>
> = (props) => {
  const [gridProps, cxProps, rest] = splitProps(props, ['state'], ['class'])

  const cellStyle = () => {
    const clampedRowStart = clamp(gridProps.state.rowStart, { max: 6, min: 0 })
    const clampedRowEnd = clamp(gridProps.state.rowEnd, { max: 6, min: 0 })
    const clampedColumnStart = clamp(gridProps.state.columnStart, {
      max: 6,
      min: 0
    })
    const clampedColumnEnd = clamp(gridProps.state.columnEnd, {
      max: 6,
      min: 0
    })
    return [
      TW_GRID_ROW_START_LIST[clampedRowStart],
      TW_GRID_ROW_END_LIST[clampedRowEnd],
      TW_GRID_COL_START_LIST[clampedColumnStart],
      TW_GRID_COL_END_LIST[clampedColumnEnd]
    ]
  }

  return (
    <Polymorphic as='div' class={cx(cellStyle(), cxProps.class)} {...rest} />
  )
}

export const createGridCellStateScheme = (defaultState: {
  columnEnd: number
  columnStart: number
  rowEnd: number
  rowStart: number
}) =>
  z.object({
    columnEnd: withMetadata(
      z.coerce.number().int().min(0).max(6).default(defaultState.columnEnd),
      {
        description: 'Enter the ending column position (horizontal) in grid.',
        group: 'Grid',
        label: 'Column End'
      }
    ),
    columnStart: withMetadata(
      z.coerce.number().int().min(0).max(6).default(defaultState.columnStart),
      {
        description: 'Enter the starting column position (horizontal) in grid.',
        group: 'Grid',
        label: 'Column Start'
      }
    ),
    rowEnd: withMetadata(
      z.coerce.number().int().min(0).max(6).default(defaultState.rowEnd),
      {
        description: 'Enter the ending row position (vertical) in grid.',
        group: 'Grid',
        label: 'Row End'
      }
    ),
    rowStart: withMetadata(
      z.coerce.number().int().min(0).max(6).default(defaultState.rowStart),
      {
        description: 'Enter the starting row position (vertical) in grid.',
        group: 'Grid',
        label: 'Row Start'
      }
    )
  })
