import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
  ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }]
] satisfies IconNode
export const X: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='X' />
)
