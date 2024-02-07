import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { iconTypes, icons } from '@/components/applet/icons'
import { cx } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { Dynamic } from 'solid-js/web'
import { z } from 'zod'

const stateSchema = z.object({
  disabled: withMetadata(z.boolean().default(false), {
    description: 'Check to make the button disabled.',
    label: 'Disabled'
  }),
  icon: withMetadata(z.enum(iconTypes).default('none'), {
    description: 'Choose an icon to display on the button.',
    label: 'Icon'
  }),
  label: withMetadata(z.string().default('Button'), {
    description: 'Enter the text to display on the button.',
    label: 'Label'
  }),
  onClick: withMetadata(z.string().optional(), {
    description: 'Enter javascript code that is run on click.',
    label: 'On Click'
  })
})

const component: Component<AppletNodeRenderProps> = (props) => {
  const [state, { boundFunctions }] = useBlackboard(() => props.id, stateSchema)

  return (
    <button
      class={cx(
        'group mx-2 cursor-pointer rounded-md border border-[#1a1a1a] bg-background p-0.5',
        'text-left align-baseline ring-offset-background focus:outline-none focus:ring-2',
        'focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      )}
      disabled={state.disabled}
      onClick={boundFunctions.onClick}
    >
      <div
        class={cx(
          'inline-flex min-w-[2rem] items-center justify-center gap-3 rounded-md px-3',
          'group-enabled:active:bg-[#C7C7C7]'
        )}
      >
        <Dynamic class='mr-2 size-4' component={icons[state.icon]} />
        {state.label}
      </div>
    </button>
  )
}

export { component, stateSchema }
