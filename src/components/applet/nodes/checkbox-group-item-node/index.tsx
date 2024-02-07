import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { cva } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { As, Checkbox } from '@kobalte/core'
import { Show, createEffect, on } from 'solid-js'
import { z } from 'zod'

const children = ['text', 'inline-latex', 'inline-image']
const stateSchema = z.object({
  checked: withMetadata(z.boolean().default(false), {
    description: 'Controlled checked state.',
    label: 'Checked'
  }),
  onCheckedChange: withMetadata(z.string().optional(), {
    description: 'Enter javascript code that is run on checked state change.',
    label: 'On checked change'
  }),
  showIcon: withMetadata(z.boolean().default(false), {
    description: 'Check to show the icon.',
    label: 'Show icon'
  }),
  text: withMetadata(z.string().optional(), {
    description:
      'Enter the item text. Use children instead if additional customization is required.',
    label: 'Text'
  }),
  variant: withMetadata(
    z.enum(['default', 'success', 'error', 'disabled']).default('default'),
    {
      description: 'Select the variant of the checkbox.',
      label: 'Variant'
    }
  )
})

const containerVariants = cva({
  base: [
    'group mx-2 flex flex-col items-stretch justify-stretch rounded-md border border-[#1a1a1a] bg-background p-1',
    'cursor-pointer text-left align-baseline ring-offset-background focus:outline-none focus:ring-2',
    'focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  ],
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: '',
      disabled: '',
      error: 'data-[checked]:border-[#CC6666] data-[checked]:text-[#CC6666]',
      success: 'data-[checked]:border-[#6CA621] data-[checked]:text-[#6CA621]'
    }
  }
})

const innerContainerVariants = cva({
  base: [
    'inline-flex min-w-[2rem] items-center justify-center gap-3 rounded-md px-3'
  ],
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'group-data-[checked]:bg-[#C7C7C7]',
      disabled: 'group-data-[checked]:bg-[#C7C7C7]',
      error: 'group-data-[checked]:bg-[#FFF2F2]',
      success: 'group-data-[checked]:bg-[#F0FFF4]'
    }
  }
})

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  const [state, { boundFunctions, setState }] = useBlackboard(
    () => props.id,
    stateSchema
  )

  createEffect(
    on(() => state.checked, boundFunctions.onCheckedChange, { defer: true })
  )

  const handleCheckedChange = (checked: boolean) => {
    setState('checked', checked)
  }

  return (
    <Checkbox.Root
      checked={state.checked}
      class={containerVariants({ variant: state.variant })}
      disabled={state.variant === 'disabled'}
      onChange={handleCheckedChange}
    >
      <Checkbox.Control
        class={innerContainerVariants({ variant: state.variant })}
      >
        <Show when={state.showIcon}>
          <svg
            class='size-5'
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect height='18' rx='2' width='18' x='3' y='3' />
            <Checkbox.Indicator asChild>
              <As
                component='rect'
                fill='currentColor'
                height='10'
                rx='2'
                width='10'
                x='7'
                y='7'
              />
            </Checkbox.Indicator>
          </svg>
        </Show>
        <Show when={state.text}>
          <Checkbox.Label class='pointer-events-none'>
            {state.text}
          </Checkbox.Label>
        </Show>
      </Checkbox.Control>
    </Checkbox.Root>
  )
}

export { children, component, stateSchema }
