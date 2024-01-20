import { SaveButton } from '@/components/cms/save-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/toaster'
import { markdocConfigs } from '@/content/config'
import { cx } from '@/lib/utils'
import Markdoc from '@markdoc/markdoc'
import {
  type Component,
  type ComponentProps,
  createMemo,
  createSignal,
  splitProps
} from 'solid-js'

import { MarkdocEditor } from '../editor'
import { MarkdocPreviewIframe } from '../preview'
import { SandboxContextProvider } from './context'

interface SandboxProps extends ComponentProps<typeof Tabs> {
  collection: keyof typeof markdocConfigs
  initialContent?: string
  slug: string
}
export const Sandbox: Component<SandboxProps> = (props) => {
  const [editorProps, cxProps, rest] = splitProps(
    props,
    ['initialContent'],
    ['class']
  )
  const [content, setContent] = createSignal(editorProps.initialContent || '')
  const ast = createMemo(() => Markdoc.parse(content()))
  const config = () => markdocConfigs[props.collection]
  const errors = createMemo(() => Markdoc.validate(ast(), config()))
  const renderNodes = createMemo(() => Markdoc.transform(ast(), config()))

  return (
    <SandboxContextProvider
      value={{ ast, content, errors, renderNodes, setContent }}
    >
      <Tabs
        class={cx('flex flex-col', cxProps.class)}
        defaultValue='editor'
        {...rest}
      >
        <TabsList class='grid w-full grid-cols-3'>
          <TabsTrigger value='editor'>Editor</TabsTrigger>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <SaveButton
            collection={props.collection}
            content={content()}
            ext='md'
            slug={props.slug}
          />
        </TabsList>
        <TabsContent class='flex-1' value='editor'>
          <MarkdocEditor class='h-full' />
        </TabsContent>
        <TabsContent class='flex-1' value='preview'>
          <MarkdocPreviewIframe collection={props.collection} />
        </TabsContent>
      </Tabs>
      <Toaster />
    </SandboxContextProvider>
  )
}
