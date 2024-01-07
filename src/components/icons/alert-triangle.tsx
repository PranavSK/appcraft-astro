import type { Component } from 'solid-js'

import { Icon, type IconNode, type LucideProps } from './icon'

const iconNode = [
  [
    'path',
    {
      d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z',
      key: 'c3ski4'
    }
  ],
  ['path', { d: 'M12 9v4', key: 'juzpu7' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }]
] satisfies IconNode
export const AlertTriangle: Component<LucideProps> = (props) => (
  <Icon {...props} name='AlertTriangle' iconNode={iconNode} />
)
