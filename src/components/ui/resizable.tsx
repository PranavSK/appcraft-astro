import type { Component } from 'solid-js'
import type {
  PanelGroupProps,
  PanelResizeHandleProps
} from 'solid-resizable-panels-port'

import { GripVertical } from '@/components/icons'
import { cx } from '@/lib/utils'
import { splitProps } from 'solid-js'
import * as ResizablePrimitive from 'solid-resizable-panels-port'

const ResizablePanelGroup: Component<PanelGroupProps> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])
  return (
    <ResizablePrimitive.PanelGroup
      class={cx(
        'flex size-full data-[panel-group-direction=vertical]:flex-col',
        cxProps.class
      )}
      {...rest}
    />
  )
}

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle: Component<
  PanelResizeHandleProps & { withHandle?: boolean }
> = (props) => {
  const [cxProps, gripProps, rest] = splitProps(
    props,
    ['class'],
    ['withHandle']
  )
  return (
    <ResizablePrimitive.PanelResizeHandle
      class={cx(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
        cxProps.class
      )}
      {...rest}
    >
      {gripProps.withHandle && (
        <div class='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border'>
          <GripVertical class='size-2.5' />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
