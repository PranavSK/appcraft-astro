import type { Component } from 'solid-js'

import type { SharedContentId } from '../shared'

import { render } from '../renderer'
import { useSharedMarkdocData } from '../shared'

interface MarkdocPreviewProps {
  sharedContentId: SharedContentId
}
export const MarkdocPreview: Component<MarkdocPreviewProps> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const { renderNodes } = useSharedMarkdocData(props.sharedContentId)
  return <>{render(renderNodes())}</>
}
