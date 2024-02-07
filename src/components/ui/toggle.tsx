import type { VariantProps } from 'cva'
import type { Component } from 'solid-js'

import { cva, cx } from '@/lib/utils'
import { ToggleButton as ToggleButtonPrimitive } from '@kobalte/core'
import { splitProps } from 'solid-js'

const toggleVariants = cva({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground',
  defaultVariants: {
    size: 'default',
    variant: 'default'
  },
  variants: {
    size: {
      default: 'h-9 px-3',
      lg: 'h-10 px-3',
      sm: 'h-8 px-2'
    },
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent shadow-sm'
    }
  }
})

export interface ToggleProps
  extends ToggleButtonPrimitive.ToggleButtonRootProps,
    VariantProps<typeof toggleVariants> {}

const Toggle: Component<ToggleProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'variant', 'size'])
  return (
    <ToggleButtonPrimitive.Root
      class={cx(
        toggleVariants({ size: props.size, variant: props.variant }),
        props.class
      )}
      {...rest}
    />
  )
}

export { Toggle, toggleVariants }
