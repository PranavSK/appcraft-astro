import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { cva } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { As, RadioGroup } from '@kobalte/core'
import { Show } from 'solid-js'
import { z } from 'zod'

const children = ['text', 'inline-latex', 'inline-image']
const stateSchema = z.object({
  showIcon: withMetadata(z.boolean().default(true), {
    description: 'Check to display the icon.',
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
    'text-left align-baseline ring-offset-background focus:outline-none focus:ring-2',
    'focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  ],
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: '',
      disabled: '',
      error:
        'data-[state=checked]:border-[#CC6666] data-[state=checked]:text-[#CC6666]',
      success:
        'data-[state=checked]:border-[#6CA621] data-[state=checked]:text-[#6CA621]'
    }
  }
})

const innerContainerVariants = cva({
  base: [
    'inline-flex min-w-[2rem] items-center justify-center gap-3 rounded-md rounded-r-none px-3'
  ],
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'group-data-[state=checked]:bg-[#C7C7C7]',
      disabled: 'group-data-[state=checked]:bg-[#C7C7C7]',
      error: 'group-data-[state=checked]:bg-[#FFF2F2]',
      success: 'group-data-[state=checked]:bg-[#F0FFF4]'
    }
  }
})

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  const [state] = useBlackboard(() => props.id, stateSchema)
  return (
    <RadioGroup.Item
      class={containerVariants({ variant: state.variant })}
      disabled={state.variant === 'disabled'}
      value={props.id}
    >
      <RadioGroup.ItemControl
        class={innerContainerVariants({ variant: state.variant })}
      >
        <RadioGroup.ItemInput />
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
            <circle cx='12' cy='12' r='10' />
            <RadioGroup.ItemIndicator asChild>
              <As
                component='circle'
                cx='12'
                cy='12'
                fill='currentColor'
                r='6'
              />
            </RadioGroup.ItemIndicator>
          </svg>
        </Show>
        <RadioGroup.ItemLabel>
          {state.text}
          {props.children}
        </RadioGroup.ItemLabel>
      </RadioGroup.ItemControl>
    </RadioGroup.Item>
  )
}

export { children, component, stateSchema }
