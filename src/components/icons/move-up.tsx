import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'
const iconNode = [
  ['path', { d: 'M8 6L12 2L16 6', key: '1yvkyx' }],
  ['path', { d: 'M12 2V22', key: 'r89rzk' }]
] satisfies IconNode
export const MoveUp: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='MoveUp' />
)
