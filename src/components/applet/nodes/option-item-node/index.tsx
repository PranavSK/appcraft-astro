import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { withMetadata } from '@/lib/zod'
import { z } from 'zod'

const stateSchema = z.object({
  disabled: withMetadata(z.boolean().default(false), {
    description: 'Whether the option is disabled.',
    label: 'Disabled'
  }),
  text: withMetadata(z.string().optional(), {
    description:
      'Enter the item text. Use children instead if additional customization is required.',
    label: 'Text'
  })
})

const component: Component<AppletNodeRenderProps> = (props) => {
  const [state] = useBlackboard(() => props.id, stateSchema)

  return (
    <>
      {{
        disabled: state.disabled,
        id: props.id,
        text: state.text
      }}
    </>
  )
}

export { component, stateSchema }
