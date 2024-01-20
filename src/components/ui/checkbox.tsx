import type { Component } from 'solid-js'

import { Check } from '@/components/icons'
import { cx } from '@/lib/utils'
import { Checkbox as CheckboxPrimitive } from '@kobalte/core'
import { splitProps } from 'solid-js'

const Checkbox: Component<CheckboxPrimitive.CheckboxRootProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <CheckboxPrimitive.Root
      class={cx('group flex items-start space-x-2', props.class)}
      {...rest}
    >
      <CheckboxPrimitive.Input />
      <CheckboxPrimitive.Control class='peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-none data-[checked]:bg-primary data-[checked]:text-primary-foreground'>
        <CheckboxPrimitive.Indicator>
          <Check class='size-4' />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
