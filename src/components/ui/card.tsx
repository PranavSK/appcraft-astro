import type { Component, ComponentProps } from 'solid-js'

import { cx } from '@/lib/utils'
import { splitProps } from 'solid-js'

const Card: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <div
      class={cx(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        props.class
      )}
      {...rest}
    />
  )
}

const CardHeader: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <div class={cx('flex flex-col space-y-1.5 p-6', props.class)} {...rest} />
  )
}

const CardTitle: Component<ComponentProps<'h3'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <h3
      class={cx(
        'text-lg font-semibold leading-none tracking-tight',
        props.class
      )}
      {...rest}
    />
  )
}

const CardDescription: Component<ComponentProps<'p'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <p class={cx('text-sm text-muted-foreground', props.class)} {...rest} />
  )
}

const CardContent: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return <div class={cx('p-6 pt-0', props.class)} {...rest} />
}

const CardFooter: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return <div class={cx('flex items-center p-6 pt-0', props.class)} {...rest} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
