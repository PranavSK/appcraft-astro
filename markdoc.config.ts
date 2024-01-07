import { component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config'

export default defineMarkdocConfig({
  nodes: {
    document: {
      ...nodes.document,
      // Remove the outer wrapper `article` for mdoc content
      render: ''
    }
  },
  tags: {
    slide: {
      render: component('@/components/markdoc/slide-tag.astro')
    }
  }
})
