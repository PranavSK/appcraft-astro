import type { Component } from 'solid-js'

import { useLayout, useSelectedNode } from '@/components/applet/layout'
import { getAppletNode } from '@/components/applet/nodes'
import { MoveDown, MoveUp, Plus, Trash } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from '@/components/ui/dropdown'
import { toast } from '@/components/ui/toaster'
import { For, Show, createMemo } from 'solid-js'

export const LayoutTreeToolbar: Component = () => {
  const selected = useSelectedNode()
  const possibleChildren = createMemo(() => {
    const nodeId = selected()
    if (!nodeId) return getAppletNode('root').children
    return getAppletNode(nodeId).children
  })
  const hasChildren = () => {
    const children = possibleChildren()
    return children != null && children.length > 0
  }
  const { add, move, remove } = useLayout()
  return (
    <div class='flex items-center justify-end gap-2 p-1 pb-0'>
      <Button
        class='size-8'
        onClick={() => {
          const nodeId = selected()
          if (nodeId) move({ direction: 'up', nodeId })
        }}
        size='icon'
        variant='ghost'
      >
        <MoveUp class='size-3' />
      </Button>
      <Button
        class='size-8'
        onClick={() => {
          const nodeId = selected()
          if (nodeId) move({ direction: 'down', nodeId })
        }}
        size='icon'
        variant='ghost'
      >
        <MoveDown class='size-3' />
      </Button>
      <Button
        class='size-8'
        onClick={() => {
          const nodeId = selected()
          if (nodeId) remove({ nodeId })
        }}
        size='icon'
        variant='ghost'
      >
        <Trash class='size-3' />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          class={buttonVariants({
            class: 'size-8',
            size: 'icon',
            variant: 'ghost'
          })}
        >
          <Plus class='size-3' />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class='w-48'>
            <Show fallback={'No valid children.'} when={hasChildren()}>
              <For each={possibleChildren()}>
                {(type) => (
                  <DropdownMenuItem
                    onSelect={() => {
                      try {
                        getAppletNode(`${type}:`) // Call to throw an error when type not valid
                      } catch (error) {
                        toast.error({
                          description: `${error}`,
                          title: 'Error!'
                        })
                      }
                      add({ parentId: selected() ?? 'root', type })
                    }}
                  >
                    {type}
                  </DropdownMenuItem>
                )}
              </For>
            </Show>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  )
}
