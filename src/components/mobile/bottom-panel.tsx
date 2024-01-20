import type { ComponentProps, JSXElement, ParentComponent } from 'solid-js'

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

interface MobileBottomPanelProps {
  class?: string
  triggerAs?: ComponentProps<typeof SheetTrigger>['as']
  triggerContent?: JSXElement
}
export const MobileBottomPanel: ParentComponent<MobileBottomPanelProps> = (
  props
) => {
  return (
    <Sheet>
      <SheetTrigger as={props.triggerAs} class={props.class}>
        {props.triggerContent}
      </SheetTrigger>
      <SheetContent position='bottom' size='xl'>
        {props.children}
      </SheetContent>
    </Sheet>
  )
}
