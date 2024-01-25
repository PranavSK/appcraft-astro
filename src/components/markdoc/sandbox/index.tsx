import type { ParentComponent } from 'solid-js'

import { DisplayDevMode } from '@/components/status/display-dev-mode'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/toaster'
import { cx } from '@/lib/utils'
import { createMediaQuery } from '@solid-primitives/media'
import { Show, createMemo } from 'solid-js'
import { isDev } from 'solid-js/web'

import type { SharedContentId } from '../shared'

import { MarkdocEditor } from '../editor'
import { initializeSharedContentPool } from '../shared'
import { SaveButton } from './save-button'

interface SandboxProps {
  class?: string
  initialContent: string
  previewUrl: string
  sharedContentId: SharedContentId
}
export const MarkdocSandbox: ParentComponent<SandboxProps> = (props) => {
  // eslint-disable-next-line solid/reactivity
  initializeSharedContentPool(props.sharedContentId, props.initialContent)

  const isMediaLg = createMediaQuery('(min-width: 1024px)', true)

  const editorPanel = createMemo(() => (
    <>
      <DisplayDevMode />
      <div class='relative flex h-10 select-none items-center gap-1 bg-background p-1'>
        {props.children}
        <SaveButton class='ml-auto' sharedContentId={props.sharedContentId} />
      </div>
      <MarkdocEditor
        class='overflow-auto'
        classList={{
          'h-[calc(100%-2.5rem)]': !isDev,
          'h-[calc(100%-4.25rem)]': isDev
        }}
        sharedContentId={props.sharedContentId}
      />
    </>
  ))
  const previewPanel = createMemo(() => (
    <iframe class='size-full border-none' src={props.previewUrl} />
  ))

  return (
    <>
      <Show
        fallback={
          <Tabs class={cx('size-full', props.class)} defaultValue='editor'>
            <TabsContent
              class='m-0 h-[calc(100%-2.5rem)] w-full overflow-hidden'
              value='editor'
            >
              {editorPanel()}
            </TabsContent>
            <TabsContent
              class='m-0 h-[calc(100%-2.5rem)] w-full overflow-hidden'
              value='preview'
            >
              {previewPanel()}
            </TabsContent>
            <TabsList class='grid w-full grid-cols-2 rounded-none p-2 pb-0'>
              <TabsTrigger class='rounded-b-none' value='editor'>
                Editor
              </TabsTrigger>
              <TabsTrigger class='rounded-b-none' value='preview'>
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
        when={isMediaLg()}
      >
        <ResizablePanelGroup
          class={cx('size-full', props.class)}
          direction='horizontal'
        >
          <ResizablePanel
            class='relative size-full bg-red-50'
            collapsible
            defaultSize={40}
            minSize={20}
          >
            {editorPanel()}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} minSize={40}>
            {previewPanel()}
          </ResizablePanel>
        </ResizablePanelGroup>
      </Show>
      <Toaster />
    </>
  )
}
