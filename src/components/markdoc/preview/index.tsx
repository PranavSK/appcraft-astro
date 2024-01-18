import type { RenderableTreeNodes } from '@markdoc/markdoc'
import type { Component } from 'solid-js'

import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'

import { render } from '../renderer'
import { useSandboxContext } from '../sandbox/context'

// Note: This is expected to be used inside an iframe as a client only component
export const MarkdocPreview: Component = () => {
  const [renderNodes, setRenderNodes] = createSignal<RenderableTreeNodes>(null)

  onMount(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== location.origin) return
      setRenderNodes(event.data)
      event.preventDefault()
    }
    window.addEventListener('message', messageHandler)
    onCleanup(() => window.removeEventListener('message', () => {}))

    window.parent.postMessage({ isLoaded: true })
  })

  return <>{render(renderNodes())}</>
}

export const MarkdocPreviewIframe: Component<{ collection: string }> = (
  props
) => {
  const { renderNodes } = useSandboxContext()
  const [isIframeLoaded, setIsIframeLoaded] = createSignal(false)
  let iframe: HTMLIFrameElement | null

  onMount(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== location.origin || !event.data.isLoaded) return
      setIsIframeLoaded(true)
      event.preventDefault()
    }
    window.addEventListener('message', messageHandler)
    onCleanup(() => window.removeEventListener('message', messageHandler))
  })

  createEffect(() => {
    if (!isIframeLoaded()) return
    iframe?.contentWindow?.postMessage(renderNodes(), '*')
  })

  return (
    <iframe
      class='size-full'
      ref={iframe!}
      src={`/${props.collection}/preview`}
      style={{ border: 'none' }}
    />
  )
}
