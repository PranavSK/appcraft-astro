import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]
] satisfies IconNode
export const Check: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='Check' />
)
