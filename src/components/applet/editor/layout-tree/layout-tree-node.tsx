import type { ParentComponent } from 'solid-js'

import {
  setSelectedNode,
  useLayout,
  useSelectedNode
} from '@/components/applet/layout'
import { getAppletNode } from '@/components/applet/nodes'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { toast } from '@/components/ui/toaster'
import { Toggle } from '@/components/ui/toggle'
import { As } from '@kobalte/core'
import { For, Show, createMemo } from 'solid-js'

export const LayoutTreeNode: ParentComponent<{ id: string }> = (props) => {
  const selected = useSelectedNode()
  const possibleChildren = createMemo(() => {
    return getAppletNode(props.id).children
  })
  const hasChildren = () => {
    const children = possibleChildren()
    return children != null && children.length > 0
  }
  const { add, remove } = useLayout()
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <As
          component={Toggle}
          onChange={(pressed: boolean) =>
            setSelectedNode(pressed ? props.id : null)
          }
          pressed={selected() === props.id}
          size='sm'
        >
          {props.children}
        </As>
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent class='w-48'>
          <Show when={hasChildren()}>
            <ContextMenuSub overlap>
              <ContextMenuSubTrigger>Add Child</ContextMenuSubTrigger>
              <ContextMenuPortal>
                <ContextMenuSubContent>
                  <For each={possibleChildren()}>
                    {(type) => (
                      <ContextMenuItem
                        onSelect={() => {
                          try {
                            getAppletNode(`${type}:`) // Call to throw an error when type not valid
                          } catch (error) {
                            toast.error({
                              description: `${error}`,
                              title: 'Error!'
                            })
                          }
                          add({ parentId: props.id, type })
                        }}
                      >
                        {type}
                      </ContextMenuItem>
                    )}
                  </For>
                </ContextMenuSubContent>
              </ContextMenuPortal>
            </ContextMenuSub>
          </Show>
          <ContextMenuItem
            onSelect={() => {
              remove({ nodeId: props.id })
            }}
          >
            Remove
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  )
}
