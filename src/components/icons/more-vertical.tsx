import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['circle', { cx: '12', cy: '12', key: '41hilf', r: '1' }],
  ['circle', { cx: '12', cy: '5', key: 'gxeob9', r: '1' }],
  ['circle', { cx: '12', cy: '19', key: 'lyex9k', r: '1' }]
] satisfies IconNode
export const MoreVertical: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='MoreVertical' />
)
