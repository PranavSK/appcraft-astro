import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]
] satisfies IconNode
export const ChevronUp: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='ChevronUp' />
)
