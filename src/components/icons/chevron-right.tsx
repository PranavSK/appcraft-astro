import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]
] satisfies IconNode
export const ChevronRight: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='ChevronRight' />
)
