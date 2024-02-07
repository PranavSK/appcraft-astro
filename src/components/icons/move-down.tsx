import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'
const iconNode = [
  ['path', { d: 'M8 18L12 22L16 18', key: 'cskvfv' }],
  ['path', { d: 'M12 2V22', key: 'r89rzk' }]
] satisfies IconNode
export const MoveDown: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='MoveDown' />
)
