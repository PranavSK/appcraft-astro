import { useStore } from '@nanostores/solid'
import { action, atom } from 'nanostores'

const sharedContentStore = atom('')
export const setSharedContent = action(
  sharedContentStore,
  'setContent',
  (store, content: string) => store.set(content)
)

export const useSharedContentState = useStore.bind(null, sharedContentStore)
