import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  ['circle', { cx: '9', cy: '12', key: '1vctgf', r: '1' }],
  ['circle', { cx: '9', cy: '5', key: 'hp0tcf', r: '1' }],
  ['circle', { cx: '9', cy: '19', key: 'fkjjf6', r: '1' }],
  ['circle', { cx: '15', cy: '12', key: '1tmaij', r: '1' }],
  ['circle', { cx: '15', cy: '5', key: '19l28e', r: '1' }],
  ['circle', { cx: '15', cy: '19', key: 'f4zoj3', r: '1' }]
] satisfies IconNode
export const GripVertical: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='GripVertical' />
)
