import type { Component, ParentComponent } from 'solid-js'

import { AppletContextProvider } from '@/components/applet/context'
import { useSubLayout } from '@/components/applet/layout'
import { getAppletNode } from '@/components/applet/nodes'
import { For } from 'solid-js'
import { Dynamic } from 'solid-js/web'

interface AppletPreviewProps {
  id: string
}
const Fragment: ParentComponent = (props) => <>{props.children}</>
export const AppletPreview: Component<AppletPreviewProps> = (appletProps) => {
  // eslint-disable-next-line solid/reactivity
  const appletId = appletProps.id

  const AppletPreviewRenderer: Component<{ id: string }> = (props) => {
    const layout = useSubLayout(() => props.id)
    return (
      <Dynamic
        component={getAppletNode(props.id).component ?? Fragment}
        id={props.id}
      >
        <For each={layout()}>{(id) => <AppletPreviewRenderer id={id} />}</For>
      </Dynamic>
    )
  }

  return (
    <AppletContextProvider value={{ appletId }}>
      <AppletPreviewRenderer id='root' />
    </AppletContextProvider>
  )
}
