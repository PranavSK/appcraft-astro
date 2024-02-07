import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { cx } from '@/lib/utils'
import { withMetadata, zodColor } from '@/lib/zod'
import { z } from 'zod'

const stateSchema = z.object({
  color: withMetadata(zodColor.default('currentColor'), {
    description: 'Enter the text color.',
    label: 'Color'
  }),
  highlightColor: withMetadata(zodColor.default('transparent'), {
    description: 'Enter the highlight color.',
    label: 'Highlight Color'
  }),
  text: withMetadata(z.coerce.string().default('Sample text'), {
    description: 'Enter the text to display.',
    label: 'Text'
  })
})

const component: Component<AppletNodeRenderProps> = (props) => {
  const [state] = useBlackboard(() => props.id, stateSchema)
  return (
    <span
      class={cx(state.highlightColor !== 'transparent' && 'rounded-md p-1')}
      style={{
        'background-color':
          state.highlightColor === 'transparent'
            ? undefined
            : state.highlightColor,
        color: state.color
      }}
    >
      {state.text}
    </span>
  )
}

export { component, stateSchema }
