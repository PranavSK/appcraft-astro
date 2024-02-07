import type { Component, ComponentProps } from 'solid-js'

export const icons = Object.fromEntries(
  Object.entries(
    import.meta.glob<Component<ComponentProps<'svg'>>>('./**.tsx', {
      eager: true,
      import: 'Icon'
    })
  ).map(([key, value]) => [key.replace('./', '').replace('.tsx', ''), value])
)

export const iconTypes = ['none', ...Object.keys(icons)] as const
