import type {
  AppletSchemaNode,
  AppletSchemaRoot
} from '@/components/applet/schema'
import type { Accessor } from 'solid-js'

import { deleteBlackboard } from '@/components/applet/blackboard'
import { useAppletContext } from '@/components/applet/context'
import { createStorePool } from '@/lib/store/pool'
import { persistentMap } from '@nanostores/persistent'
import { nanoid } from 'nanoid'
import { action, atom } from 'nanostores'
import { from } from 'solid-js'

type AppletLayout = Record<string, ReadonlyArray<string>>

const layoutPool = createStorePool((id: string) =>
  persistentMap(`${id}/layout/`, {} as AppletLayout, {
    decode(value) {
      return JSON.parse(value)
    },
    encode(value) {
      return JSON.stringify(value)
    }
  })
)

const convertTreeToLayout = (tree: AppletSchemaRoot) => {
  const layout: AppletLayout = {}

  function recursiveNodeToLayout(node: AppletSchemaNode) {
    const id = node.id
    if (node.children == null) return

    layout[id] = node.children.map((child) => child.id)
    node.children.forEach((child) => recursiveNodeToLayout(child))
  }

  recursiveNodeToLayout(tree)
  return layout
}

export const initializeLayout = (id: string, tree: AppletSchemaRoot) => {
  const store = layoutPool(id)
  if (Object.keys(store.get()).length !== 0) return
  const layout = convertTreeToLayout(tree)
  store.set(layout)
}

export const getLayout = (id: string) => {
  const store = layoutPool(id)
  return store.get()
}

function findParent(layout: AppletLayout, nodeId: string) {
  for (const [parentId, children] of Object.entries(layout)) {
    if (children.includes(nodeId)) {
      return parentId
    }
  }
}
export const useLayout = () => {
  const { appletId } = useAppletContext()
  const store = layoutPool(appletId)
  const add = action(
    store,
    'add',
    (s, { parentId, type }: { parentId: string; type: string }) => {
      const children = s.get()[parentId] ?? []
      const newNodeId = `${type}:${nanoid(10)}`
      s.setKey(parentId, [...children, newNodeId])
    }
  )
  const remove = action(
    store,
    'remove',
    (s, { nodeId }: { nodeId: string }) => {
      const layout = s.get()
      function recursiveRemoveNode(id: string) {
        const children = layout[id] ?? []
        children.forEach((childId) => recursiveRemoveNode(childId))
        // @ts-expect-error we set undefined to delete the key
        s.setKey(id, undefined)
        // Remove any blackboard keys for this id
        deleteBlackboard({ appletId, nodeId: id })
      }

      recursiveRemoveNode(nodeId)
      const parentId = findParent(layout, nodeId)
      if (parentId == null) return

      const children = layout[parentId] ?? []
      const newChildren = children.filter((childId) => childId !== nodeId)
      s.setKey(parentId, newChildren)

      const selectedNode = selectedNodeStore.get()
      if (selectedNode === nodeId) {
        setSelectedNode(null)
      }
    }
  )
  const move = action(
    store,
    'move',
    (
      s,
      { direction, nodeId }: { direction: 'down' | 'up'; nodeId: string }
    ) => {
      const layout = s.get()
      const parentId = findParent(layout, nodeId)
      if (parentId == null) return
      const children = layout[parentId]
      const index = children.indexOf(nodeId)
      const newIndex =
        direction === 'down'
          ? Math.min(index + 1, children.length - 1)
          : Math.max(0, index - 1)
      const newChildren = [...children]
      newChildren[index] = children[newIndex]
      newChildren[newIndex] = children[index]
      s.setKey(parentId, newChildren)
    }
  )
  const layout = from(store)
  return { add, layout, move, remove }
}

export const getChildren = (appletId: string, nodeId: string) => {
  const store = layoutPool(appletId)
  const layout = store.get()
  return layout[nodeId] ?? []
}

export const useSubLayout = (nodeId: Accessor<string>) => {
  const { appletId } = useAppletContext()
  const store = layoutPool(appletId)
  return from<ReadonlyArray<string>>((set) => {
    return store.subscribe((layout, changedKey) => {
      if (changedKey == null || changedKey === nodeId()) {
        set(layout[nodeId()])
      }
    })
  })
}

const selectedNodeStore = atom<null | string>(null)
export const setSelectedNode = action(
  selectedNodeStore,
  'set-select',
  (store, value: null | string) => store.set(value)
)
export const useSelectedNode = () => {
  return from(selectedNodeStore)
}
