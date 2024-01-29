import type { RenderableTreeNodes, Scalar } from '@markdoc/markdoc'
import type { JSXElement } from 'solid-js'

import Markdoc from '@markdoc/markdoc'
import { createComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { components } from '../shared'

const Tag = Markdoc.Tag
type TagType = InstanceType<typeof Tag>
export function render(nodes: RenderableTreeNodes) {
  function recursiveRenderTag(tag: TagType) {
    const component = components[tag.name] ?? tag.name

    function resolveTags(value: unknown): unknown {
      if (value == null) return value
      if (Array.isArray(value)) {
        return value.map(resolveTags)
      }

      if (Tag.isTag(value)) {
        return recursiveRenderTag(value)
      }

      if (typeof value === 'object') {
        return Object.fromEntries(
          Object.entries(value).map(([key, value]) => [key, resolveTags(value)])
        )
      }

      return value
    }
    const attributes = resolveTags(tag.attributes) as Record<string, Scalar>

    return createComponent(Dynamic, {
      children: tag.children.map(recursiveRender),
      component,
      ...attributes
    })
  }

  function recursiveRender(node: RenderableTreeNodes): JSXElement {
    if (node == null) return node

    if (Array.isArray(node)) {
      return node.map(recursiveRender)
    }

    if (Tag.isTag(node) || typeof node === 'object') {
      return recursiveRenderTag(node as TagType)
    }

    return node
  }

  return recursiveRender(nodes)
}

export const MarkdocRenderer = (props: { nodes: RenderableTreeNodes }) => (
  <>{render(props.nodes)}</>
)
