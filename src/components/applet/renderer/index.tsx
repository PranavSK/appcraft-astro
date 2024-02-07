import type {
  AppletSchemaNode,
  AppletSchemaRoot
} from '@/components/applet/schema'
import type { Component, ParentComponent } from 'solid-js'

import { initializeBlackboard } from '@/components/applet/blackboard'
import { AppletContextProvider } from '@/components/applet/context'
import { ShowWhenGroup } from '@/components/applet/group'
import { getAppletNode } from '@/components/applet/nodes'
import { For, createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'

const Fragment: ParentComponent = (props) => <>{props.children}</>
const RecursiveRender: Component<{ node: AppletSchemaNode }> = (props) => {
  const appletNode = createMemo(() => getAppletNode(props.node.id))
  return (
    <ShowWhenGroup groups={props.node.groups}>
      <Dynamic
        component={appletNode().component ?? Fragment}
        id={props.node.id}
      >
        <For each={props.node.children}>
          {(child) => <RecursiveRender node={child} />}
        </For>
      </Dynamic>
    </ShowWhenGroup>
  )
}

interface AppletRendererProps {
  id: string
  root: AppletSchemaRoot
}
export const AppletRenderer: Component<AppletRendererProps> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const { id: appletId, root } = props
  initializeBlackboard(appletId, root)

  return (
    <AppletContextProvider value={{ appletId }}>
      <RecursiveRender node={root} />
    </AppletContextProvider>
  )
}
