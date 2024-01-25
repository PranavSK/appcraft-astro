import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  [
    'path',
    {
      d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z',
      key: '1owoqh'
    }
  ],
  ['polyline', { key: '1md35c', points: '17 21 17 13 7 13 7 21' }],
  ['polyline', { key: '8nz8an', points: '7 3 7 8 15 8' }]
] satisfies IconNode
export const Save: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='Save' />
)
