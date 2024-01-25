import type { Component, ComponentProps } from 'solid-js'

import {
  markDocTagParser,
  markdocLinter,
  markdownFrontmatterParser
} from '@/lib/codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import { materialDark } from 'cm6-theme-material-dark'
import { basicSetup } from 'codemirror'
import { createCodeMirror, createEditorControlledValue } from 'solid-codemirror'

import type { SharedContentId } from '../shared'

import { setSharedContent, useSharedMarkdocData } from '../shared'

interface MarkdocEditorProps extends ComponentProps<'div'> {
  sharedContentId: SharedContentId
}
export const MarkdocEditor: Component<MarkdocEditorProps> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const { content, errors } = useSharedMarkdocData(props.sharedContentId)
  const {
    createExtension,
    editorView,
    ref: editorRef
  } = createCodeMirror({
    onValueChange: (value) => setSharedContent(props.sharedContentId, value)
  })
  createEditorControlledValue(editorView, content)

  createExtension(materialDark)
  createExtension(EditorView.lineWrapping)
  createExtension(basicSetup)
  createExtension(
    markdown({ extensions: [markdownFrontmatterParser, markDocTagParser] })
  )
  createExtension(() => markdocLinter(errors()))

  return <div {...props} ref={editorRef} />
}
