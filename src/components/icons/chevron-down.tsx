import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]
] satisfies IconNode
export const ChevronDown: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='ChevronDown' />
)
