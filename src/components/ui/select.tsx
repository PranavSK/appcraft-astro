import type { Component } from 'solid-js'

import { Check, ChevronDown } from '@/components/icons'
import { cx } from '@/lib/utils'
import { Select as SelectPrimitive } from '@kobalte/core'
import { splitProps } from 'solid-js'

const Select = SelectPrimitive.Root

const SelectNativeHidden = SelectPrimitive.HiddenSelect

const SelectValue = SelectPrimitive.Value

const SelectTrigger: Component<SelectPrimitive.SelectTriggerProps> = (
  props
) => {
  const [, rest] = splitProps(props, ['class', 'children'])
  return (
    <SelectPrimitive.Trigger
      class={cx(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )}
      {...rest}
    >
      {props.children}
      <SelectPrimitive.Icon>
        <ChevronDown class='size-4 opacity-50' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

const SelectContent: Component<SelectPrimitive.SelectContentProps> = (
  props
) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class={cx(
          'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
          props.class
        )}
        {...rest}
      >
        <SelectPrimitive.Listbox class='m-0 p-1' />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

const SelectItem: Component<SelectPrimitive.SelectItemProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'children'])
  return (
    <SelectPrimitive.Item
      class={cx(
        'relative mt-0 flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )}
      {...rest}
    >
      <span class='absolute left-2 flex size-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <Check class='size-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemLabel>{props.children}</SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  )
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectNativeHidden,
  SelectTrigger,
  SelectValue
}
