import markdoc from '@astrojs/markdoc'
import solidJs from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [tailwind(), solidJs(), markdoc()]
})
