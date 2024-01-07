import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['path', { d: 'm16 6 4 14', key: 'ji33uf' }],
  ['path', { d: 'M12 6v14', key: '1n7gus' }],
  ['path', { d: 'M8 8v12', key: '1gg7y9' }],
  ['path', { d: 'M4 4v16', key: '6qkkli' }]
] satisfies IconNode
export const Library: Component<LucideProps> = (props) => (
  <Icon {...props} name='Library' iconNode={iconNode} />
)
