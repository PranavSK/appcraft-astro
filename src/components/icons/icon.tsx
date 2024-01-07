import { type Component, For, splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { Dynamic } from 'solid-js/web'

const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
} as const

export type IconNode = [
  elementName: keyof JSX.IntrinsicElements,
  attrs: Record<string, string>
][]
type SVGAttributes = Partial<JSX.SvgSVGAttributes<SVGSVGElement>>
export interface LucideProps extends SVGAttributes {
  key?: string | number
  color?: string
  size?: string | number
  strokeWidth?: string | number
  class?: string
  absoluteStrokeWidth?: boolean
}

interface IconProps {
  name: string
  iconNode: IconNode
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
      width={localProps.size ?? defaultAttributes.width}
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
