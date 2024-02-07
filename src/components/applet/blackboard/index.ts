import type {
  AppletSchemaNode,
  AppletSchemaRoot
} from '@/components/applet/schema'
import type { Json } from '@/lib/zod'
import type { Accessor } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'
import type { z } from 'zod'

import { useAppletContext } from '@/components/applet/context'
import { createStorePool } from '@/lib/store/pool'
import { extractZodDef } from '@/lib/zod'
import { persistentMap } from '@nanostores/persistent'
import { onCleanup } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'

const blackboardPool = createStorePool(
  ({ appletId, nodeId }: { appletId: string; nodeId: string }) =>
    persistentMap(
      `${appletId}/blackboard/${nodeId}:`,
      {} as Record<string, Json>,
      {
        decode(value) {
          return JSON.parse(value)
        },
        encode(value) {
          return JSON.stringify(value)
        }
      }
    ),
  (a, b) => a.appletId === b.appletId && a.nodeId === b.nodeId
)

export function getBlackboard<S extends z.AnyZodObject>(
  appletId: string,
  nodeId: string,
  schema: S
) {
  const store = blackboardPool({ appletId, nodeId })
  return schema.parse(store.get())
}

export function initializeBlackboard(appletId: string, tree: AppletSchemaRoot) {
  function recursiveNodeToBlackboard(node: AppletSchemaNode) {
    const nodeId = node.id
    const initialState = node.initialState

    if (initialState != null) {
      const store = blackboardPool({ appletId, nodeId })
      if (Object.keys(store.get()).length === 0) store.set(initialState)
    }

    if (node.children == null) return
    node.children.forEach((child) => recursiveNodeToBlackboard(child))
  }
  recursiveNodeToBlackboard(tree)
}

export function updateBlackboard(
  args: {
    appletId: string
    nodeId: string
  } & (
    | {
        key: string
        value: Json
      }
    | {
        key?: null
        value: Record<string, Json>
      }
  )
) {
  const { appletId, key, nodeId, value } = args
  if (key != null) {
    blackboardPool({ appletId, nodeId }).setKey(key, value)
  } else blackboardPool({ appletId, nodeId }).set(value)
}

export function deleteBlackboard({
  appletId,
  nodeId
}: {
  appletId: string
  nodeId: string
}): void {
  blackboardPool.remove({ appletId, nodeId })
}

export function useBlackboard<
  S extends z.AnyZodObject | z.ZodEffects<z.AnyZodObject>
>(nodeId: Accessor<string>, schema: S) {
  const { appletId } = useAppletContext()
  const store = blackboardPool({
    appletId,
    get nodeId() {
      return nodeId()
    }
  })
  function get(id: string, key: string) {
    return blackboardPool({ appletId, nodeId: id }).get()[key]
  }

  function set(id: string, key: string, value: Json) {
    blackboardPool({ appletId, nodeId: id }).setKey(key, value)
  }

  const defaultValue = schema.parse(store.get())
  const [state, setState] = createStore(defaultValue)
  const unSubscribe = store.subscribe((value) => {
    setState(reconcile(value))
  })
  onCleanup(unSubscribe)

  const boundFunctions = Object.keys(extractZodDef(schema).shape())
    .filter((key) => key.startsWith('on'))
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: () => {
          const fn = store.get()[key] as string | undefined
          if (fn) new Function('get', 'set', fn).bind(state, get, set)()
        }
      }),
      {} as Record<Extract<keyof z.infer<S>, `on${string}`>, () => void>
    )

  return [
    state as Readonly<z.infer<S>>,
    { boundFunctions, setState: setState as SetStoreFunction<z.infer<S>> }
  ] as const
}
