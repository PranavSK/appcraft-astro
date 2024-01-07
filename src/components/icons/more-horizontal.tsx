import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'
const iconNode = [
  ['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
  ['circle', { cx: '19', cy: '12', r: '1', key: '1wjl8i' }],
  ['circle', { cx: '5', cy: '12', r: '1', key: '1pcz8c' }]
] satisfies IconNode
export const MoreHorizontal: Component<LucideProps> = (props) => (
  <Icon {...props} name='MoreHorizontal' iconNode={iconNode} />
)
