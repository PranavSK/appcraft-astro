import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
  ['circle', { cx: '12', cy: '5', r: '1', key: 'gxeob9' }],
  ['circle', { cx: '12', cy: '19', r: '1', key: 'lyex9k' }]
] satisfies IconNode
export const MoreVertical: Component<LucideProps> = (props) => (
  <Icon {...props} name='MoreVertical' iconNode={iconNode} />
)
