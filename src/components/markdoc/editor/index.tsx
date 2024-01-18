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

import { useSandboxContext } from '../sandbox/context'

interface MarkdocEditorProps extends ComponentProps<'div'> {}
export const MarkdocEditor: Component<MarkdocEditorProps> = (props) => {
  const { content, errors, setContent } = useSandboxContext()
  const {
    createExtension,
    editorView,
    ref: editorRef
  } = createCodeMirror({
    onValueChange: setContent
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
