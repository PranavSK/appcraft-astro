import plugin from 'tailwindcss/plugin'

export const codemirrorPlugin = plugin(function ({ matchVariant }) {
  matchVariant('cm', (value) => `& .cm-${value}`, {
    values: { content: 'content', editor: 'editor', scroller: 'scroller' }
  })
})
