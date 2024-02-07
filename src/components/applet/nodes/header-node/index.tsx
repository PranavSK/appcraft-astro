import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

import { ChevronUp } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { cx } from '@/lib/utils'

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  return (
    <Collapsible
      class={cx(
        'relative mx-auto mb-3 flex w-full flex-col items-center',
        'z-20 justify-center space-y-1.5 bg-[#f6f6f6] px-6 pb-5 pt-3',
        'before:absolute before:left-0 before:top-full before:block before:size-3',
        'before:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]',
        'before:from-transparent before:from-70% before:to-[#f6f6f6] before:to-70%',
        'after:absolute after:right-0 after:top-full after:block after:size-3',
        'after:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]',
        'after:from-transparent after:from-70% after:to-[#f6f6f6] after:to-70%',
        'md:w-9/12 md:rounded-b-xl md:before:-left-3 md:before:top-0',
        'md:before:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]',
        'md:after:-right-3 md:after:top-0',
        'md:after:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]'
      )}
      defaultOpen
    >
      <CollapsibleContent class='z-10 shrink-0 overflow-hidden text-center font-bold'>
        {props.children}
      </CollapsibleContent>
      <CollapsibleTrigger
        class={buttonVariants({
          class:
            'absolute -bottom-2 h-10 w-10 rounded-full bg-[#f6f6f6] p-2 pb-0 group/collapse',
          size: 'icon',
          variant: 'secondary'
        })}
      >
        <ChevronUp class='transition-transform group-data-[expanded]/collapse:rotate-180' />
      </CollapsibleTrigger>
    </Collapsible>
  )
}
const children = ['text', 'line-break', 'inline-latex', 'inline-image']

export { children, component }
