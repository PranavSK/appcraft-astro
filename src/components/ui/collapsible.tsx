import { cx } from '@/lib/utils'
import { Collapsible as CollapsiblePrimitive } from '@kobalte/core'
import { type Component, splitProps } from 'solid-js'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.Trigger

const CollapsibleContent: Component<
  CollapsiblePrimitive.CollapsibleContentProps
> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])
  return (
    <CollapsiblePrimitive.Content
      class={cx(
        'animate-collapsible-up data-[expanded]:animate-collapsible-down',
        cxProps.class
      )}
      {...rest}
    />
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
