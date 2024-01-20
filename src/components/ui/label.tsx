import type { Component, ComponentProps } from 'solid-js'

import { cx } from '@/lib/utils'
import { splitProps } from 'solid-js'

const Label: Component<ComponentProps<'label'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <label
      class={cx(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class
      )}
      {...rest}
    />
  )
}

export { Label }
