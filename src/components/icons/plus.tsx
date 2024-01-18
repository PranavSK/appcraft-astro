import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'
const iconNode = [
  ['path', { d: 'M5 12h14', key: '1ays0h' }],
  ['path', { d: 'M12 5v14', key: 's699le' }]
] satisfies IconNode
export const Plus: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='Plus' />
)
