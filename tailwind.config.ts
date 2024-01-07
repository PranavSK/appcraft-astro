import twTypography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import twAnimate from 'tailwindcss-animate'

import { shadcnPlugin } from './src/lib/tailwind/shadcn-plugin'

export default {
  darkMode: ['class', '[data-kb-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', ...fontFamily.sans],
        mono: ['Share Tech Mono', ...fontFamily.mono]
      }
    }
  },
  plugins: [twAnimate, twTypography, shadcnPlugin]
} satisfies Config
