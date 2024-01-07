import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'
const iconNode = [
  ['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }]
] satisfies IconNode
export const ChevronLeft: Component<LucideProps> = (props) => (
  <Icon {...props} name='ChevronLeft' iconNode={iconNode} />
)
