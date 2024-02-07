import type {
  AppletSchemaNode,
  AppletSchemaRoot
} from '@/components/applet/schema'

import { createStorePool } from '@/lib/store/pool'
import { persistentMap } from '@nanostores/persistent'

export { ShowWhenGroup } from './show-when-group'

export type GroupStore = Record<string, Array<string>>
const groupPool = createStorePool((id: string) =>
  persistentMap(`${id}/group/`, {} as GroupStore, {
    decode(value) {
      return JSON.parse(value)
    },
    encode(value) {
      return JSON.stringify(value)
    }
  })
)

export const getAppletGroups = (appletId: string) => {
  const store = groupPool(appletId)
  return store.get()
}

export const initializeGroups = (id: string, tree: AppletSchemaRoot) => {
  const store = groupPool(id)
  if (Object.keys(store.get()).length !== 0) return
  function recursiveNodeToGroup(node: AppletSchemaNode) {
    const nodeId = node.id
    const groups = node.groups
    if (groups != null) {
      store.setKey(nodeId, groups)
    }

    if (node.children == null) return
    node.children.forEach((child) => recursiveNodeToGroup(child))
  }

  recursiveNodeToGroup(tree)
}
