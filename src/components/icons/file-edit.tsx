import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  [
    'path',
    {
      d: 'M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5',
      key: '1bg6eb'
    }
  ],
  ['polyline', { key: '1ew0cm', points: '14 2 14 8 20 8' }],
  [
    'path',
    {
      d: 'M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z',
      key: '1rgxu8'
    }
  ]
] satisfies IconNode
export const FileEdit: Component<LucideProps> = (props) => (
  <Icon {...props} iconNode={iconNode} name='FileEdit' />
)
