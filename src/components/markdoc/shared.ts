import type { ContentCollectionKey } from 'astro:content'
import type { ValidComponent } from 'solid-js'

import { Document, Page } from '@/components/full-page'
import { markdocConfigs } from '@/content/config'
import { createStorePool } from '@/lib/store/pool'
import { trpc } from '@/lib/trpc/client'
import Markdoc from '@markdoc/markdoc'
import { persistentAtom } from '@nanostores/persistent'
import { action } from 'nanostores'
import { createMemo } from 'solid-js'
import { from } from 'solid-js'

const sharedContentPool = createStorePool((id: SharedContentId) =>
  persistentAtom(id)
)

export const initializeSharedContentPool = (
  id: SharedContentId,
  value: string
) => {
  const store = sharedContentPool(id)
  if (store.get()) return // already initialized
  const initialize = action(store, 'initialize', () => store.set(value))
  initialize()
}

export const setSharedContent = (id: SharedContentId, value: string) => {
  const store = sharedContentPool(id)
  const set = action(store, 'set', () => store.set(value))
  set()
}

export const getSharedContent = (id: SharedContentId) => {
  const store = sharedContentPool(id)
  const content = store.get()
  if (content == null)
    throw new Error(`Shared content with id ${id} is not initialized!`)

  return content
}

export const useSharedContent = (id: SharedContentId) => {
  const store = sharedContentPool(id)
  const signal = from(store)

  return () => {
    const content = signal()
    if (content == null)
      throw new Error(`Shared content with id ${id} is not initialized!`)

    return content
  }
}

export type SharedContentId = `${ContentCollectionKey}/${string}`

export const getCollectionAndSlugFromId = (id: SharedContentId) => {
  const [collection, slug] = id.split('/')
  return { collection: collection as ContentCollectionKey, slug }
}

export const getSaveHandler = (id: SharedContentId) => {
  const store = sharedContentPool(id)
  const { collection } = getCollectionAndSlugFromId(id)
  return action(store, 'save-content', (s, slug: string, message: string) =>
    trpc.cms.save.mutate({
      body: s.get() ?? '',
      collection,
      extension: 'md',
      message: message === '' ? undefined : message,
      slug
    })
  )
}

export const useSharedMarkdocData = (sharedContentId: SharedContentId) => {
  const { collection } = getCollectionAndSlugFromId(sharedContentId)
  const config = markdocConfigs[collection]
  const content = useSharedContent(sharedContentId)
  const ast = createMemo(() => Markdoc.parse(content()))
  const errors = createMemo(() => Markdoc.validate(ast(), config))
  const renderNodes = createMemo(() => Markdoc.transform(ast(), config))

  return {
    ast,
    content,
    errors,
    renderNodes
  }
}

export const components: Record<string, ValidComponent> = {
  'full-page-document': Document,
  'full-page-page': Page
}
