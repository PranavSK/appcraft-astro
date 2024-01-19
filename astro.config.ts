import netlify from '@astrojs/netlify'
import solidJs from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [tailwind(), solidJs()],
  output: 'hybrid',
  vite: {
    optimizeDeps: {
      // Add both @codemirror/state and @codemirror/view to included deps to optimize
      include: ['@codemirror/state', '@codemirror/view']
    }
  }
})
