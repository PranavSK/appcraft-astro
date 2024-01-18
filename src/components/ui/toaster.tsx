import type { VariantProps } from 'cva'
import type { Component, JSX } from 'solid-js'

import { X } from '@/components/icons'
import { cva, cx } from '@/lib/utils'
import { Toast as ToastPrimitive, toaster } from '@kobalte/core'
import { Match, Switch, splitProps } from 'solid-js'
import { Portal } from 'solid-js/web'

const Toaster: Component<ToastPrimitive.ToastListProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <Portal>
      <ToastPrimitive.Region>
        <ToastPrimitive.List
          class={cx(
            'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
            props.class
          )}
          {...rest}
        />
      </ToastPrimitive.Region>
    </Portal>
  )
}

const toastVariants = cva({
  base: 'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--kb-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--kb-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[opened]:animate-in data-[closed]:animate-out data-[swipe=end]:animate-out data-[closed]:fade-out-80 data-[closed]:slide-out-to-right-full data-[opened]:slide-in-from-top-full data-[opened]:sm:slide-in-from-bottom-full',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'border bg-background text-foreground',
      destructive:
        'group border-destructive bg-destructive text-destructive-foreground'
    }
  }
})
type ToastVariant = NonNullable<VariantProps<typeof toastVariants>['variant']>

interface ToastProps
  extends ToastPrimitive.ToastRootProps,
    VariantProps<typeof toastVariants> {}

const Toast: Component<ToastProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'variant'])
  return (
    <ToastPrimitive.Root
      class={cx(toastVariants({ variant: props.variant }), props.class)}
      {...rest}
    />
  )
}

const ToastClose: Component<ToastPrimitive.ToastCloseButtonProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <ToastPrimitive.CloseButton
      class={cx(
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
        props.class
      )}
      {...rest}
    >
      <X class='size-4' />
    </ToastPrimitive.CloseButton>
  )
}

const ToastTitle: Component<ToastPrimitive.ToastTitleProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <ToastPrimitive.Title
      class={cx('text-sm font-semibold', props.class)}
      {...rest}
    />
  )
}

const ToastDescription: Component<ToastPrimitive.ToastDescriptionProps> = (
  props
) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <ToastPrimitive.Description
      class={cx('text-sm opacity-90', props.class)}
      {...rest}
    />
  )
}
interface ToastTemplateProps extends ToastPrimitive.ToastComponentProps {
  description?: JSX.Element
  duration?: number | undefined
  title?: JSX.Element
  variant?: ToastVariant | undefined
}
const ToastTemplate: Component<ToastTemplateProps> = (props) => {
  return (
    <Toast
      duration={props.duration}
      toastId={props.toastId}
      variant={props.variant}
    >
      <div class='grid gap-1'>
        {props.title && <ToastTitle>{props.title}</ToastTitle>}
        {props.description && (
          <ToastDescription>{props.description}</ToastDescription>
        )}
      </div>
      <ToastClose />
    </Toast>
  )
}

function showToast(opts: {
  description?: JSX.Element
  duration?: number
  title?: JSX.Element
}) {
  toaster.show((data) => <ToastTemplate {...data} {...opts} />)
}

interface ToastOptions {
  description?: JSX.Element
  duration?: number
  title?: JSX.Element
}
interface ToastMethod {
  (props: ToastOptions): void
  error: (props: ToastOptions) => void
  promise: <T, U>(
    promise: (() => Promise<T>) | Promise<T>,
    options: {
      error?: (error: U) => ToastOptions
      loading?: ToastOptions
      success?: (result: T | undefined) => ToastOptions
    }
  ) => void
}
showToast.error = (props: ToastOptions) => {
  toaster.show((data) => (
    <ToastTemplate {...data} {...props} variant='destructive' />
  ))
}
showToast.promise = (async (promise, options) => {
  toaster.promise(promise, (data) => (
    <Switch>
      <Match when={data.state === 'pending'}>
        <ToastTemplate {...data} {...options.loading} />
      </Match>
      <Match when={data.state === 'rejected'}>
        <ToastTemplate {...data} {...options.error?.(data.error)} />
      </Match>
      <Match when={data.state === 'fulfilled'}>
        <ToastTemplate {...data} {...options.success?.(data.data)} />
      </Match>
    </Switch>
  ))
}) satisfies ToastMethod['promise']

const toast: ToastMethod = showToast

export { Toaster, toast }
