import type { Json } from '@/lib/zod'
import type { Component } from 'solid-js'

import { getBlackboard, updateBlackboard } from '@/components/applet/blackboard'
import { useAppletContext } from '@/components/applet/context'
import { useSelectedNode } from '@/components/applet/layout'
import { getAppletNode } from '@/components/applet/nodes'
import { FormBuilder } from '@/components/form-builder'
import { ClipboardCopy } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/utils'
import { Show, createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'

export const InspectorPanel: Component = () => {
  const { appletId } = useAppletContext()
  const selected = useSelectedNode()

  const inspector = createMemo(() => {
    const node = selected()
    if (!node) return
    const { inspector, stateSchema } = getAppletNode(node)
    if (inspector) return <Dynamic component={inspector} id={selected()!} />
    if (stateSchema)
      return (
        <FormBuilder
          initialValues={getBlackboard(appletId, node, stateSchema)}
          onDataChange={(value: unknown, key: unknown) =>
            updateBlackboard({
              appletId,
              key: key as string,
              nodeId: selected()!,
              value: value as Json
            })
          }
          onSubmit={(value: unknown) =>
            updateBlackboard({
              appletId,
              nodeId: selected()!,
              value: value as Record<string, Json>
            })
          }
          schema={stateSchema}
        />
      )
    return <>No inspector for selected node.</>
  })

  return (
    <div class='h-full space-y-4 overflow-auto p-4'>
      <Show fallback='No node selected.' when={!!selected()}>
        <div class='flex gap-2'>
          <Button
            onClick={() => copyToClipboard(selected()!)}
            size='sm'
            variant='outline'
          >
            <span class='w-32 truncate'>{selected()!}</span>
            <ClipboardCopy class='ml-1 size-4' />
          </Button>
        </div>
        {inspector()}
      </Show>
    </div>
  )
}
