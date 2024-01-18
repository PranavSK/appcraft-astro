import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  [
    'path',
    {
      d: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z',
      key: '1nnpy2'
    }
  ],
  ['polyline', { key: '1ew0cm', points: '14 2 14 8 20 8' }]
] satisfies IconNode
export const File: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='File' />
)
