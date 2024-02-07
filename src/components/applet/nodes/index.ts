import type { Component, ParentComponent } from 'solid-js'
import type { z } from 'zod'

export interface AppletNodeRenderProps {
  id: string
}

export interface AppletNode {
  children?: ReadonlyArray<string>
  component?: ParentComponent<AppletNodeRenderProps>
  inspector?: Component<AppletNodeRenderProps>
  stateSchema?: z.AnyZodObject
}

const appletNode = import.meta.glob<AppletNode>('./**-node/index.tsx', {
  eager: true
})

export function getTypeFromId(id: string) {
  return id.split(':')[0]
}

export function getAppletNode(id: string): AppletNode {
  const type = getTypeFromId(id)
  const node = appletNode[`./${type}-node/index.tsx`]
  if (!node) {
    throw new Error(`Node type "${type}" not implemented`)
  }
  return node
}
