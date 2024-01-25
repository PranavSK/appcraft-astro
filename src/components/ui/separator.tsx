import type { Component } from 'solid-js'

import { cx } from '@/lib/utils'
import { Separator as SeparatorPrimitive } from '@kobalte/core'
import { splitProps } from 'solid-js'

const Separator: Component<SeparatorPrimitive.SeparatorRootProps> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class', 'orientation'])
  return (
    <SeparatorPrimitive.Root
      class={cx(
        'shrink-0 bg-border',
        cxProps.orientation === 'vertical'
          ? 'h-full w-[1px]'
          : 'h-[1px] w-full',
        cxProps.class
      )}
      orientation={cxProps.orientation ?? 'horizontal'}
      {...rest}
    />
  )
}

export { Separator }
