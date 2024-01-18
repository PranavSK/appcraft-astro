import type { MarkdownConfig } from '@lezer/markdown'

import { tags } from '@lezer/highlight'

export const markDocTagParser = {
  defineNodes: [{ block: true, name: 'MarkdocTag', style: tags.meta }],
  parseBlock: [
    {
      endLeaf(_cx, line, _leaf) {
        return (
          line.next == 123 && line.text.slice(line.pos).trim().startsWith('{%')
        )
      },
      name: 'MarkdocTag',
      parse(cx, line) {
        if (line.next != 123) return false

        const content = line.text.slice(line.pos).trim()
        if (!content.startsWith('{%') || !content.endsWith('%}')) return false

        cx.addElement(
          cx.elt('MarkdocTag', cx.lineStart, cx.lineStart + line.text.length)
        )
        cx.nextLine()
        return true
      }
    }
  ]
} satisfies MarkdownConfig
