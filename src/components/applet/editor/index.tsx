import type { AppletSchemaRoot } from '@/components/applet/schema'
import type { Component, ComponentProps } from 'solid-js'

import { initializeBlackboard } from '@/components/applet/blackboard'
import { AppletContextProvider } from '@/components/applet/context'
import { HierarchyPanel } from '@/components/applet/editor/hierarchy-panel'
import { initializeGroups } from '@/components/applet/group'
import { initializeLayout } from '@/components/applet/layout'
import { DisplayDevMode } from '@/components/status/display-dev-mode'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/toaster'
import { createMediaQuery } from '@solid-primitives/media'
import { Show, createMemo } from 'solid-js'
import { isDev } from 'solid-js/web'

import { InspectorPanel } from './inspector-panel'

interface AppletEditorProps extends ComponentProps<'div'> {
  id: string
  initialApplet: AppletSchemaRoot
  previewUrl: string
}
export const AppletEditor: Component<AppletEditorProps> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const appletId = props.id
  const isMediaLg = createMediaQuery('(min-width: 1024px)', true)
  const previewPanel = createMemo(() => (
    <iframe
      class='inset-0 size-full overflow-auto border-none'
      src={props.previewUrl}
    />
  ))
  const hierarchyPanel = createMemo(() => (
    <AppletContextProvider value={{ appletId }}>
      <HierarchyPanel>{props.children}</HierarchyPanel>
    </AppletContextProvider>
  ))
  const inspectorPanel = createMemo(() => (
    <AppletContextProvider value={{ appletId }}>
      <InspectorPanel />
    </AppletContextProvider>
  ))

  initializeLayout(appletId, props.initialApplet)
  initializeGroups(appletId, props.initialApplet)
  initializeBlackboard(appletId, props.initialApplet)

  return (
    <div class={props.class}>
      <DisplayDevMode />

      <Show
        fallback={
          <Tabs
            class={isDev ? 'h-[calc(100%-1.75rem)]' : 'h-full'}
            defaultValue='editor'
          >
            <TabsContent
              class='m-0 h-[calc(100%-2.5rem)] w-full overflow-hidden'
              value='hierarchy'
            >
              {hierarchyPanel()}
            </TabsContent>
            <TabsContent
              class='m-0 h-[calc(100%-2.5rem)] w-full overflow-hidden'
              value='preview'
            >
              {previewPanel()}
            </TabsContent>
            <TabsContent
              class='m-0 h-[calc(100%-2.5rem)] w-full overflow-hidden'
              value='inspector'
            >
              {inspectorPanel()}
            </TabsContent>
            <TabsList class='grid w-full grid-cols-3 rounded-none p-2 pb-0'>
              <TabsTrigger class='rounded-b-none' value='hierarchy'>
                Hierarchy
              </TabsTrigger>
              <TabsTrigger class='rounded-b-none' value='preview'>
                Preview
              </TabsTrigger>
              <TabsTrigger class='rounded-b-none' value='inspector'>
                Inspector
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
        when={isMediaLg()}
      >
        <div class={isDev ? 'h-[calc(100%-1.75rem)]' : 'h-full'}>
          <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel
              class='relative size-full'
              collapsible
              defaultSize={20}
              minSize={10}
            >
              {hierarchyPanel()}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={20}>
              {previewPanel()}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel collapsible defaultSize={30} minSize={20}>
              {inspectorPanel()}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Show>

      <Toaster />
    </div>
  )
}
