import type { Component, ComponentProps } from 'solid-js'

import { X } from '@/components/icons'
import { cva, cx } from '@/lib/utils'
import { Dialog as SheetPrimitive } from '@kobalte/core'
import { type VariantProps } from 'cva'
import { splitProps } from 'solid-js'

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.CloseButton

const portalVariants = cva({
  base: 'fixed inset-0 z-50 flex',
  defaultVariants: { position: 'right' },
  variants: {
    position: {
      bottom: 'items-end',
      left: 'justify-start',
      right: 'justify-end',
      top: 'items-start'
    }
  }
})

interface SheetPortalProps
  extends SheetPrimitive.DialogPortalProps,
    VariantProps<typeof portalVariants> {}

const SheetPortal: Component<SheetPortalProps> = (props) => {
  const [, rest] = splitProps(props, ['position', 'children'])
  return (
    <SheetPrimitive.Portal {...rest}>
      <div class={portalVariants({ position: props.position })}>
        {props.children}
      </div>
    </SheetPrimitive.Portal>
  )
}

const SheetOverlay: Component<SheetPrimitive.DialogOverlayProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <SheetPrimitive.Overlay
      class={cx(
        'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
        props.class
      )}
      {...rest}
    />
  )
}

const sheetVariants = cva({
  base: 'fixed z-50 scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg',
  compoundVariants: [
    {
      class: 'max-h-screen',
      position: ['top', 'bottom'],
      size: 'content'
    },
    {
      class: 'h-1/3',
      position: ['top', 'bottom'],
      size: 'default'
    },
    {
      class: 'h-1/4',
      position: ['top', 'bottom'],
      size: 'sm'
    },
    {
      class: 'h-1/2',
      position: ['top', 'bottom'],
      size: 'lg'
    },
    {
      class: 'h-5/6',
      position: ['top', 'bottom'],
      size: 'xl'
    },
    {
      class: 'h-screen',
      position: ['top', 'bottom'],
      size: 'full'
    },
    {
      class: 'max-w-screen',
      position: ['right', 'left'],
      size: 'content'
    },
    {
      class: 'w-1/3',
      position: ['right', 'left'],
      size: 'default'
    },
    {
      class: 'w-1/4',
      position: ['right', 'left'],
      size: 'sm'
    },
    {
      class: 'w-1/2',
      position: ['right', 'left'],
      size: 'lg'
    },
    {
      class: 'w-5/6',
      position: ['right', 'left'],
      size: 'xl'
    },
    {
      class: 'w-screen',
      position: ['right', 'left'],
      size: 'full'
    }
  ],
  defaultVariants: {
    position: 'right',
    size: 'default'
  },
  variants: {
    position: {
      bottom: 'w-full duration-300 animate-in slide-in-from-bottom',
      left: 'h-full duration-300 animate-in slide-in-from-left',
      right: 'h-full duration-300 animate-in slide-in-from-right',
      top: 'w-full duration-300 animate-in slide-in-from-top'
    },
    size: {
      content: '',
      default: '',
      full: '',
      lg: '',
      sm: '',
      xl: ''
    }
  }
})

export interface DialogContentProps
  extends SheetPrimitive.DialogContentProps,
    VariantProps<typeof sheetVariants> {}

const SheetContent: Component<DialogContentProps> = (props) => {
  const [, rest] = splitProps(props, ['position', 'size', 'class', 'children'])
  return (
    <SheetPortal position={props.position}>
      <SheetOverlay />
      <SheetPrimitive.Content
        class={cx(
          sheetVariants({ position: props.position, size: props.size }),
          props.class
        )}
        {...rest}
      >
        {props.children}
        <SheetPrimitive.CloseButton class='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
          <X class='size-4' />
          <span class='sr-only'>Close</span>
        </SheetPrimitive.CloseButton>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

const SheetHeader: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <div
      class={cx(
        'flex flex-col space-y-2 text-center sm:text-left',
        props.class
      )}
      {...rest}
    />
  )
}

const SheetFooter: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <div
      class={cx(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        props.class
      )}
      {...rest}
    />
  )
}

const SheetTitle: Component<SheetPrimitive.DialogTitleProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <SheetPrimitive.Title
      class={cx('text-lg font-semibold text-foreground', props.class)}
      {...rest}
    />
  )
}

const SheetDescription: Component<SheetPrimitive.DialogDescriptionProps> = (
  props
) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <SheetPrimitive.Description
      class={cx('text-sm text-muted-foreground', props.class)}
      {...rest}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
}
