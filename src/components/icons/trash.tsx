import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
  ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', key: '4alrt4' }],
  ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', key: 'v07s0e' }],
  ['line', { key: '1uufr5', x1: '10', x2: '10', y1: '11', y2: '17' }],
  ['line', { key: 'xtxkd', x1: '14', x2: '14', y1: '11', y2: '17' }]
] satisfies IconNode
export const Trash: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='Trash' />
)
