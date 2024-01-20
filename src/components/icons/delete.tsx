import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  [
    'path',
    { d: 'M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z', key: '1oy587' }
  ],
  ['line', { key: '1olkx5', x1: '18', x2: '12', y1: '9', y2: '15' }],
  ['line', { key: '1n50pc', x1: '12', x2: '18', y1: '9', y2: '15' }]
] satisfies IconNode
export const Delete: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='Delete' />
)
