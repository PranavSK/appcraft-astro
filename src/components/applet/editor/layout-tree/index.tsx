import { useSubLayout } from '@/components/applet/layout'
import { getTypeFromId } from '@/components/applet/nodes'
import { ChevronRight } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { cx } from '@/lib/utils'
import {
  type Component,
  type ComponentProps,
  For,
  Show,
  splitProps
} from 'solid-js'

import { LayoutTreeNode } from './layout-tree-node'
import { LayoutTreeToolbar } from './layout-tree-toolbar'

interface LayoutTreeProps extends ComponentProps<'ul'> {}
export const LayoutTree: Component<LayoutTreeProps> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])

  const Node: Component<{ id: string }> = (props) => {
    const type = () => getTypeFromId(props.id)
    const layout = useSubLayout(() => props.id)
    const isBranch = () => {
      const children = layout()
      return children && children.length > 0
    }

    const toggle = <LayoutTreeNode id={props.id}>{type()}</LayoutTreeNode>

    return (
      <li>
        <Show fallback={toggle} when={isBranch()}>
          <Collapsible>
            <div class='flex w-full items-center justify-between'>
              {toggle}
              <CollapsibleTrigger
                class={buttonVariants({
                  class: 'group/collapse',
                  size: 'icon',
                  variant: 'ghost'
                })}
              >
                <ChevronRight class='size-3 transition-transform group-data-[expanded]/collapse:rotate-90' />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <ul class='ml-2 border-l pl-1'>
                <For each={layout()}>{(id) => <Node id={id} />}</For>
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </Show>
      </li>
    )
  }

  const rootLayout = useSubLayout(() => 'root')

  return (
    <>
      <LayoutTreeToolbar />
      <ul class={cx('overflow-auto p-2', cxProps.class)} {...rest}>
        <For each={rootLayout()}>{(id) => <Node id={id} />}</For>
      </ul>
    </>
  )
}
