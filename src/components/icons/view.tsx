import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  [
    'path',
    {
      d: 'M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z',
      key: 'vptub8'
    }
  ],
  ['path', { d: 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', key: '10lhjs' }],
  ['path', { d: 'M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2', key: 'mrq65r' }],
  ['path', { d: 'M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2', key: 'be3xqs' }]
] satisfies IconNode
export const View: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='View' />
)
