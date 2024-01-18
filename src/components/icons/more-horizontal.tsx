import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'
const iconNode = [
  ['circle', { cx: '12', cy: '12', key: '41hilf', r: '1' }],
  ['circle', { cx: '19', cy: '12', key: '1wjl8i', r: '1' }],
  ['circle', { cx: '5', cy: '12', key: '1pcz8c', r: '1' }]
] satisfies IconNode
export const MoreHorizontal: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='MoreHorizontal' />
)
