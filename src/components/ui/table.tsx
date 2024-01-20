import type { Component, ComponentProps } from 'solid-js'

import { cx } from '@/lib/utils'
import { splitProps } from 'solid-js'

const Table: Component<ComponentProps<'table'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <div class='relative w-full overflow-auto'>
      <table
        class={cx('w-full caption-bottom text-sm', props.class)}
        {...rest}
      />
    </div>
  )
}

const TableHeader: Component<ComponentProps<'thead'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return <thead class={cx('[&_tr]:border-b', props.class)} {...rest} />
}

const TableBody: Component<ComponentProps<'tbody'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <tbody class={cx('[&_tr:last-child]:border-0', props.class)} {...rest} />
  )
}

const TableFooter: Component<ComponentProps<'tfoot'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <tfoot
      class={cx('bg-primary font-medium text-primary-foreground', props.class)}
      {...rest}
    />
  )
}

const TableRow: Component<ComponentProps<'tr'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <tr
      class={cx(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        props.class
      )}
      {...rest}
    />
  )
}

const TableHead: Component<ComponentProps<'th'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <th
      class={cx(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        props.class
      )}
      {...rest}
    />
  )
}

const TableCell: Component<ComponentProps<'td'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <td
      class={cx('p-4 align-middle [&:has([role=checkbox])]:pr-0', props.class)}
      {...rest}
    />
  )
}

const TableCaption: Component<ComponentProps<'caption'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <caption
      class={cx('mt-4 text-sm text-muted-foreground', props.class)}
      {...rest}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
}
