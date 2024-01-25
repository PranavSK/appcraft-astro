import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'
const iconNode = [
  ['circle', { cx: '12', cy: '12', key: '1mglay', r: '10' }]
] satisfies IconNode
export const Circle: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='Circle' />
)
