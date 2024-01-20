import type { ComponentProps, JSXElement, ParentComponent } from 'solid-js'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { splitProps } from 'solid-js'

interface MobileBottomPanelProps
  extends Pick<ComponentProps<typeof Sheet>, 'onOpenChange' | 'open'> {
  class?: string
  triggerAs?: ComponentProps<typeof SheetTrigger>['as']
  triggerContent?: JSXElement
}
export const MobileBottomPanel: ParentComponent<MobileBottomPanelProps> = (
  props
) => {
  const [triggerProps, contentProps, rootProps] = splitProps(
    props,
    ['class', 'triggerAs', 'triggerContent'],
    ['children']
  )
  return (
    <Sheet {...rootProps}>
      <SheetTrigger as={triggerProps.triggerAs} class={triggerProps.class}>
        {triggerProps.triggerContent}
      </SheetTrigger>
      <SheetContent position='bottom' size='xl'>
        {contentProps.children}
      </SheetContent>
    </Sheet>
  )
}
