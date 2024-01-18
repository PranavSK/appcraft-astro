import type { JSX } from 'solid-js/jsx-runtime'

import { type Component, For, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

const defaultAttributes = {
  fill: 'none',
  height: 24,
  stroke: 'currentColor',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'stroke-width': 2,
  viewBox: '0 0 24 24',
  width: 24,
  xmlns: 'http://www.w3.org/2000/svg'
} as const

export type IconNode = [
  elementName: keyof JSX.IntrinsicElements,
  attrs: Record<string, string>
][]
type SVGAttributes = Partial<JSX.SvgSVGAttributes<SVGSVGElement>>
export interface LucideProps extends SVGAttributes {
  absoluteStrokeWidth?: boolean
  class?: string
  color?: string
  key?: number | string
  size?: number | string
  strokeWidth?: number | string
}

interface IconProps {
  iconNode: IconNode
  name: string
}

export const toKebabCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
export const Icon: Component<LucideProps & IconProps> = (props) => {
  const [localProps, rest] = splitProps(props, [
    'color',
    'size',
    'strokeWidth',
    'children',
    'name',
    'iconNode',
    'absoluteStrokeWidth'
  ])

  return (
    <svg
      {...defaultAttributes}
      height={localProps.size ?? defaultAttributes.height}
      stroke={localProps.color ?? defaultAttributes.stroke}
      stroke-width={
        localProps.absoluteStrokeWidth
          ? (Number(
              localProps.strokeWidth ?? defaultAttributes['stroke-width']
            ) *
              24) /
            Number(localProps.size)
          : Number(localProps.strokeWidth ?? defaultAttributes['stroke-width'])
      }
      width={localProps.size ?? defaultAttributes.width}
      {...rest}
    >
      <For each={localProps.iconNode}>
        {([elementName, attrs]) => {
          return <Dynamic component={elementName} {...attrs} />
        }}
      </For>
    </svg>
  )
}
