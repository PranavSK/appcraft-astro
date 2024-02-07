import { defineConfig } from 'cva'
import { twMerge } from 'tailwind-merge'

export const { compose, cva, cx } = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className)
  }
})

export function copyToClipboard(text: string) {
  if (!navigator.clipboard) return
  navigator.clipboard.writeText(text)
}
