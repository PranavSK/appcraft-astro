import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component, ParentComponent } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import {
  GridCell,
  createGridCellStateScheme
} from '@/components/applet/nodes/grid-node/grid-cell'
import { clamp } from '@/lib/math'
import { withMetadata } from '@/lib/zod'
import { createEffect, on } from 'solid-js'
import { z } from 'zod'

const children = ['label']
const stateSchema = createGridCellStateScheme({
  columnEnd: 5,
  columnStart: 2,
  rowEnd: 6,
  rowStart: 4
})
  .extend({
    max: withMetadata(z.coerce.number().default(10), {
      description: 'Maximum value of the stepper.',
      label: 'Max'
    }),
    min: withMetadata(z.coerce.number().default(0), {
      description: 'Minimum value of the stepper.',
      label: 'Min'
    }),
    onValueChange: withMetadata(z.string().optional(), {
      description: 'Enter javascript code that is run on stepper value change.',
      label: 'On value change'
    }),
    step: withMetadata(z.coerce.number().default(1), {
      description: 'Enter the step size.',
      label: 'Step'
    }),
    value: withMetadata(z.coerce.number().default(0), {
      description: 'Controlled value of the stepper',
      label: 'Value'
    })
  })
  .superRefine((data, ctx) => {
    if (data.min > data.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Min must be less than or equal to max',
        path: ['min']
      })
    }

    if (data.step <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        exact: true,
        inclusive: false,
        message: 'Step must be greater than 0',
        minimum: 0,
        path: ['step'],
        type: 'number'
      })
    }

    if (data.value < data.min || data.value > data.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Value must be between min and max',
        path: ['value']
      })
    }

    if (data.step > data.max - data.min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Step must be less than or equal to max - min',
        path: ['step']
      })
    }
  })

const Button: ParentComponent<{ onClick: () => void }> = (props) => (
  <button
    class='size-11 rounded-full p-3 ring-offset-background transition-colors hover:bg-[#C7C7C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none'
    onClick={() => props.onClick()}
  >
    {props.children}
  </button>
)

const Minus: Component = () => (
  <svg fill='none' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.26237 11.2774H9.14286H2V9H9.14286L9.08333 9.00001H11.4643L11.5238 9H18.6667L18.7262 11.2774H11.5833H11.4368H9.26237Z'
      fill='currentColor'
    />
  </svg>
)

const Plus: Component = () => (
  <svg fill='none' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.14286 17.942V11.1097H2V8.8323H9.14286V2H11.5238V8.8323H18.6667V11.1097H11.5238V17.942H9.14286Z'
      fill='currentColor'
    />
  </svg>
)

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  const [state, { boundFunctions, setState }] = useBlackboard(
    () => props.id,
    stateSchema
  )
  const stepPrecision = () => state.step.toString().split('.')[1]?.length ?? 0
  const valueText = () => state.value.toFixed(stepPrecision())

  const handleAdd = () => {
    setState((prev) => {
      const { max, min, step, value } = prev
      const newValue = parseFloat(
        clamp(value + step, { max, min }).toFixed(stepPrecision())
      )
      return { ...prev, value: newValue }
    })
  }

  createEffect(
    on(() => state.value, boundFunctions.onValueChange, { defer: true })
  )

  const handleSubtract = () => {
    setState((prev) => {
      const { max, min, step, value } = prev
      const newValue = clamp(value - step, { max, min })

      return { ...prev, value: newValue }
    })
  }

  return (
    <GridCell
      as='div'
      class='flex flex-col items-center justify-center gap-3'
      state={state}
    >
      {props.children}
      <div class='flex items-center justify-between gap-[0.625rem] self-stretch rounded-md border border-[#1a1a1a] bg-white p-2'>
        <Button onClick={handleSubtract}>
          <Minus />
        </Button>
        <span>{valueText()}</span>
        <Button onClick={handleAdd}>
          <Plus />
        </Button>
      </div>
    </GridCell>
  )
}

export { children, component, stateSchema }
