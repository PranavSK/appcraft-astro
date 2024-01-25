import type { MarkdownConfig } from '@lezer/markdown'

import { jsonLanguage } from '@codemirror/lang-json'
import { foldInside, foldNodeProp } from '@codemirror/language'
import { parseMixed } from '@lezer/common'
import { styleTags, tags } from '@lezer/highlight'

const frontmatterFence = /^---\s*$/m
const FRONTMATTER_NAME = 'Frontmatter'

export const markdownFrontmatterParser = {
  defineNodes: [{ block: true, name: FRONTMATTER_NAME }],
  parseBlock: [
    {
      before: 'HorizontalRule',
      name: FRONTMATTER_NAME,
      parse(cx, line) {
        if (cx.lineStart === 0 && frontmatterFence.test(line.text)) {
          // Skip until closing fence
          while (cx.nextLine() && !frontmatterFence.test(line.text)) {}
          const end = cx.lineStart + line.text.length
          cx.addElement(cx.elt(FRONTMATTER_NAME, 0, end))
          return true
        }
        return false
      }
    }
  ],
  props: [
    styleTags({
      Frontmatter: [tags.documentMeta, tags.monospace],
      FrontmatterMark: tags.processingInstruction
    }),
    foldNodeProp.add({
      Frontmatter: foldInside,
      FrontmatterMark: () => null
    })
  ],
  wrap: parseMixed((node) => {
    if (node.type.name === FRONTMATTER_NAME) {
      return {
        overlay: [{ from: node.from + 4, to: node.to - 4 }],
        parser: jsonLanguage.parser
      }
    }

    return null
  })
} satisfies MarkdownConfig
