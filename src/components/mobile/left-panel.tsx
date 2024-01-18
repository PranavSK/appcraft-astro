import type { ParentComponent } from 'solid-js'

import { PanelLeftOpen } from '../icons/panel-left-open'
import { buttonVariants } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

interface MobileLeftPanelProps {
  class?: string
}
export const MobileLeftPanel: ParentComponent<MobileLeftPanelProps> = (
  props
) => {
  return (
    <Sheet>
      <SheetTrigger
        class={buttonVariants({
          class: props.class,
          size: 'icon',
          variant: 'ghost'
        })}
      >
        <PanelLeftOpen />
      </SheetTrigger>
      <SheetContent position='left' size='xl'>
        {props.children}
      </SheetContent>
    </Sheet>
  )
}
