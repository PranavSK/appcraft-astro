import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  [
    'rect',
    { height: '18', key: 'afitv7', rx: '2', width: '18', x: '3', y: '3' }
  ],
  ['path', { d: 'M9 3v18', key: 'fh3hqa' }],
  ['path', { d: 'm14 9 3 3-3 3', key: '8010ee' }]
] satisfies IconNode
export const PanelLeftOpen: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='PanelLeftOpen' />
)
