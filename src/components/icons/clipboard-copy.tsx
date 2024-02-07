import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  [
    'rect',
    { height: '4', key: 'tgr4d6', rx: '1', ry: '1', width: '8', x: '8', y: '2' }
  ],
  [
    'path',
    {
      d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
      key: '4jdomd'
    }
  ],
  ['path', { d: 'M16 4h2a2 2 0 0 1 2 2v4', key: '3hqy98' }],
  ['path', { d: 'M21 14H11', key: '1bme5i' }],
  ['path', { d: 'm15 10-4 4 4 4', key: '5dvupr' }]
] satisfies IconNode
export const ClipboardCopy: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='ClipboardCopy' />
)
