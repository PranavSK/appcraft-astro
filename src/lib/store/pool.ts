import type { Store } from 'nanostores'

import { onMount } from 'nanostores'
export function createStorePool<Id, StoreType extends Store<unknown>>(
  initializer: (id: Id) => StoreType,
  equal?: (a: Id, b: Id) => boolean
) {
  const stores = new Map<Id, StoreType>()

  const storeGetter = equal
    ? (id: Id) => {
        for (const [key, store] of stores) {
          if (equal(key, id)) return store
        }
      }
    : (id: Id) => stores.get(id)
  const factory = (id: Id) => {
    let store = storeGetter(id)
    if (store) return store

    store = initializer(id)
    stores.set(id, store)
    onMount(store, () => {
      // Remove the store if no subscribers. This is to prevent memory leaks.
      return () => {
        return factory.remove(id)
      }
    })
    return store
  }

  factory.remove = equal
    ? (id: Id) => {
        for (const [key] of stores) {
          if (equal(key, id)) stores.delete(key)
        }
      }
    : (id: Id) => stores.delete(id)

  return factory
}
