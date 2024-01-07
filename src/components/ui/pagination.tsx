import { cx } from 'cva'
import { type ComponentProps, splitProps } from 'solid-js'
import type { Component } from 'solid-js/types/server/rendering.js'

import { ChevronLeft, ChevronRight, MoreHorizontal } from '@/components/icons'

import { type ButtonProps, buttonVariants } from './button'

const Pagination: Component<ComponentProps<'nav'>> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      class={cx('mx-auto flex w-full justify-center', cxProps.class)}
      {...rest}
    />
  )
}

const PaginationContent: Component<ComponentProps<'ul'>> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])
  return (
    <ul
      class={cx('flex flex-row items-center gap-1', cxProps.class)}
      {...rest}
    />
  )
}

const PaginationItem: Component<ComponentProps<'li'>> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])
  return <li class={cx(cxProps.class)} {...rest} />
}

type PaginationLinkProps = { isActive?: boolean } & Pick<ButtonProps, 'size'> &
  ComponentProps<'a'>
const PaginationLink: Component<PaginationLinkProps> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class', 'isActive', 'size'])
  return (
    <PaginationItem>
      <a
        aria-current={cxProps.isActive ? 'page' : undefined}
        class={buttonVariants({
          variant: cxProps.isActive ? 'outline' : 'ghost',
          size: cxProps.size,
          class: cxProps.class
        })}
        {...rest}
      />
    </PaginationItem>
  )
}

const PaginationPrevious: Component<PaginationLinkProps> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class', 'size'])
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      class={cx('gap-1 pl-2.5', cxProps.class)}
      {...rest}
    >
      <ChevronLeft class='h-4 w-4' />
      <span>Previous</span>
    </PaginationLink>
  )
}

const PaginationNext: Component<PaginationLinkProps> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class', 'size'])
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      class={cx('gap-1 pr-2.5', cxProps.class)}
      {...rest}
    >
      <span>Next</span>
      <ChevronRight class='h-4 w-4' />
    </PaginationLink>
  )
}

const PaginationEllipsis: Component<ComponentProps<'span'>> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])
  return (
    <span
      aria-hidden
      class={cx('flex h-9 w-9 items-center justify-center', cxProps.class)}
      {...rest}
    >
      <MoreHorizontal class='h-4 w-4' />
      <span class='sr-only'>More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
