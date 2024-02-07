import type { Config } from 'tailwindcss'

import twGridAreas from '@savvywombat/tailwindcss-grid-areas'
import twTypography from '@tailwindcss/typography'
import { fontFamily } from 'tailwindcss/defaultTheme'
import twAnimate from 'tailwindcss-animate'

import { createFluidValuePx } from './tools/create-fluid-value'
import { codemirrorPlugin } from './tools/tailwind-plugins/codemirror-plugin'
import { shadcnPlugin } from './tools/tailwind-plugins/shadcn-plugin'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['class', '[data-kb-theme="dark"]'],
  plugins: [
    twAnimate,
    twTypography,
    twGridAreas,
    shadcnPlugin,
    codemirrorPlugin
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Share Tech Mono', ...fontFamily.mono],
        sans: ['Urbanist', ...fontFamily.sans]
      },
      fontSize: {
        applet: createFluidValuePx(12, 24, 320, 1280)
      },
      gridTemplateAreas: {
        'collection-list': [
          'title-filename title-title',
          'filename title',
          'title-description title-description',
          'description description'
        ],
        'collection-list-wide': [
          'title-filename title-title title-description title-description',
          'filename title description description'
        ]
      },
      gridTemplateRows: {
        applet: 'repeat(6, minmax(0, 6.5rem));'
      }
    }
  }
} satisfies Config
