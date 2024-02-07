import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { stateSchema as itemStateSchema } from '@/components/applet/nodes/option-item-node'
import type { ParentComponent } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { Check, ChevronDown } from '@/components/icons'
import { cva } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { Select } from '@kobalte/core'
import {
  createEffect,
  createMemo,
  on,
  children as resolveChildren
} from 'solid-js'
import { z } from 'zod'

const children = ['option-item']
const stateSchema = z.object({
  onOpenChange: withMetadata(z.string().optional(), {
    description:
      'Enter javascript code that is run when the dropdown is opened or closed.',
    label: 'On Open Change'
  }),
  onValueChange: withMetadata(z.string().optional(), {
    description:
      'Enter javascript code that is run when the value of the dropdown is changed.',
    label: 'On value change'
  }),
  open: withMetadata(z.boolean().default(false), {
    description: 'Controlled open state.',
    label: 'Open'
  }),
  value: withMetadata(z.coerce.string().optional(), {
    description: 'Controlled selected option value.',
    label: 'Value'
  }),
  variant: withMetadata(
    z.enum(['default', 'success', 'error', 'disabled']).default('default'),
    {
      description: 'Select the variant of the button.',
      label: 'Variant'
    }
  )
})

const triggerOuterContainerVariants = cva({
  base: [
    'mx-2 rounded-md border bg-background p-1',
    'text-left align-baseline ring-offset-background focus:outline-none focus:ring-2',
    'focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  ],
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'border-[#1a1a1a]',
      disabled: 'border-[#1a1a1a]',
      error: 'border-[#CC6666]',
      success: 'border-[#6CA621]'
    }
  }
})

const triggerInnerContainerVariants = cva({
  base: [
    'inline-flex min-w-[2rem] items-center justify-center gap-3 rounded-md rounded-r-none px-3'
  ],
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: '',
      disabled: '',
      error: 'bg-[#FFF2F2] text-[#CC6666]',
      success: 'bg-[#F0FFF4] text-[#6CA621]'
    }
  }
})

const triggerIconVariants = cva({
  base: ['size-4 rounded-md rounded-l-none'],
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'text-[#212121]',
      disabled: 'text-[#212121]',
      error: 'text-[#CC6666]',
      success: 'text-[#6CA621]'
    }
  }
})

type ItemState = z.infer<typeof itemStateSchema> & {
  id: string
}

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  const [state, { boundFunctions, setState }] = useBlackboard(
    () => props.id,
    stateSchema
  )

  createEffect(
    on(() => state.open, boundFunctions.onOpenChange, { defer: true })
  )
  createEffect(
    on(() => state.value, boundFunctions.onValueChange, { defer: true })
  )

  const resolvedChildren = resolveChildren(() => props.children)
    .toArray as unknown as () => ItemState[]
  const resolvedChildrenMap = createMemo(() =>
    resolvedChildren().reduce(
      (acc, child) => ({ ...acc, [child.id]: child }),
      {} as Record<string, ItemState>
    )
  )
  const selected = createMemo(() =>
    state.value ? resolvedChildrenMap()[state.value] : undefined
  )

  const handleOpenChange = (open: boolean) => {
    setState('open', open)
  }

  const handleValueChange = (item: ItemState) => {
    setState('value', item.id ?? undefined)
  }

  return (
    <Select.Root<ItemState>
      class='inline-block'
      disabled={state.variant === 'disabled'}
      itemComponent={(itemProps) => (
        <Select.Item
          class='relative w-full cursor-default select-none rounded-md py-0.5 pl-4 pr-8 outline-none focus:bg-[#C7C7C7] data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
          item={itemProps.item}
        >
          <Select.ItemLabel>{itemProps.item.rawValue.text}</Select.ItemLabel>
          <Select.ItemIndicator
            as={Check}
            class='absolute right-2 top-1/2 size-6 -translate-y-1/2 p-1'
          />
        </Select.Item>
      )}
      multiple={false}
      onChange={handleValueChange}
      onOpenChange={handleOpenChange}
      open={state.open}
      optionDisabled='disabled'
      optionTextValue='text'
      optionValue='id'
      options={resolvedChildren()}
      value={selected()}
    >
      <Select.Trigger
        class={triggerOuterContainerVariants({ variant: state.variant })}
      >
        <div class={triggerInnerContainerVariants({ variant: state.variant })}>
          <Select.Value<ItemState>>
            {({ selectedOption }) => selectedOption().text}
          </Select.Value>
          <Select.Icon
            as={ChevronDown}
            class={triggerIconVariants({
              class: 'transition-transform data-[expanded]:rotate-180',
              variant: state.variant
            })}
          />
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class='relative z-50 overflow-hidden rounded-md border border-[#1a1a1a] bg-white p-1 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95'>
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export { children, component, stateSchema }
