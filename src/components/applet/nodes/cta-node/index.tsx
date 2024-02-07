import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { iconTypes, icons } from '@/components/applet/icons'
import { cva } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { Dynamic } from 'solid-js/web'
import { z } from 'zod'

const buttonVariants = cva({
  base: 'inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'bg-[#1A1A1A] text-white hover:bg-primary/90',
      outline: 'border border-[#1A1A1A] hover:bg-[#C7C7C7]'
    }
  }
})

const stateSchema = z.object({
  disabled: withMetadata(z.boolean().default(false), {
    description: 'Check to make the button disabled.',
    label: 'Disabled'
  }),
  icon: withMetadata(z.enum(iconTypes).default('none'), {
    description: 'Select the icon for the button.',
    label: 'Icon'
  }),
  label: withMetadata(z.string().min(1).default('Next'), {
    description: 'Enter the button label.',
    label: 'Label'
  }),
  onClick: withMetadata(z.string().optional(), {
    description: 'Enter javascript code that is run on click.',
    label: 'On click'
  }),
  variant: withMetadata(z.enum(['default', 'outline']).default('default'), {
    description: 'Select the button variant.',
    label: 'Variant'
  })
})

const component: Component<AppletNodeRenderProps> = (props) => {
  const [state, { boundFunctions }] = useBlackboard(() => props.id, stateSchema)

  return (
    <button
      class={buttonVariants({ variant: state.variant })}
      disabled={state.disabled}
      onClick={boundFunctions.onClick}
    >
      <Dynamic class='mr-2 size-4' component={icons[state.icon]} />
      {state.label}
    </button>
  )
}

export { component, stateSchema }
