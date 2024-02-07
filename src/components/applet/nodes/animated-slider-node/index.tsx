import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import {
  GridCell,
  createGridCellStateScheme
} from '@/components/applet/nodes/grid-node/grid-cell'
import { cva } from '@/lib/utils'
import { withMetadata } from '@/lib/zod'
import { Slider } from '@kobalte/core'
import { createEffect, on, onCleanup } from 'solid-js'
import { produce } from 'solid-js/store'
import { z } from 'zod'

const paths = {
  pause: {
    clipRule: 'evenodd',
    d: 'M18.3317 14.5028C18.3317 13.4902 17.5109 12.6694 16.4984 12.6694C15.4859 12.6694 14.665 13.4902 14.665 14.5028V29.5018C14.665 30.5143 15.4859 31.3351 16.4984 31.3351C17.5109 31.3351 18.3317 30.5143 18.3317 29.5018V14.5028ZM29.3317 14.5028C29.3317 13.4902 28.5109 12.6694 27.4984 12.6694C26.4859 12.6694 25.665 13.4902 25.665 14.5028V29.5018C25.665 30.5143 26.4859 31.3351 27.4984 31.3351C28.5109 31.3351 29.3317 30.5143 29.3317 29.5018V14.5028Z',
    fill: '#1A1A1A',
    fillRule: 'evenodd'
  },
  play: {
    clipRule: undefined,
    d: 'M27.2086 20.2936C28.4844 21.0735 28.4844 22.9265 27.2086 23.7064L20.2932 27.9339C18.9605 28.7486 17.25 27.7895 17.25 26.2275V17.7725C17.25 16.2105 18.9605 15.2514 20.2931 16.0661L27.2086 20.2936Z',
    fill: 'white',
    fillRule: undefined
  },
  replay: {
    clipRule: 'evenodd',
    d: 'M29.2635 14.7458L25.4296 18.5797H35.0396V8.96973L31.0942 12.9151C29.0149 10.8536 26.2994 9.55501 23.3883 9.23098C20.4585 8.90487 17.505 9.58527 15.0132 11.1603C12.5214 12.7354 10.6397 15.1114 9.67732 17.8977C8.71495 20.6841 8.72924 23.7149 9.71783 26.4921C10.7064 29.2692 12.6105 31.6273 15.117 33.1789C17.6235 34.7304 20.5833 35.3829 23.5099 35.0292C26.4364 34.6755 29.1555 33.3366 31.2202 31.2326C33.2849 29.1286 34.5723 26.3847 34.8708 23.452L32.2951 23.1899C32.0562 25.5379 31.0254 27.7347 29.3724 29.4192C27.7193 31.1037 25.5423 32.1757 23.1992 32.4589C20.8561 32.7421 18.4864 32.2197 16.4796 30.9775C14.4728 29.7353 12.9484 27.8473 12.1569 25.6238C11.3654 23.4004 11.354 20.9738 12.1245 18.7429C12.8949 16.5121 14.4015 14.6098 16.3965 13.3488C18.3915 12.0877 20.7562 11.543 23.1019 11.8041C25.4289 12.0631 27.5998 13.0999 29.2635 14.7458Z',
    fill: '#1A1A1A',
    fillRule: 'evenodd'
  }
} as const

interface IconProps {
  state: 'pause' | 'play' | 'replay'
}
const Icon: Component<IconProps> = (props) => {
  let pathEl: SVGPathElement | null

  const pathFIll = () => paths[props.state].fill
  const circleFill = () => (props.state === 'play' ? '#1A1A1A' : '#F6F6F6')

  return (
    <svg class='size-11' fill='none' viewBox='0 0 44 44'>
      <circle cx='22' cy='22' fill={circleFill()} r='20' />
      <path
        clip-rule={paths[props.state].clipRule}
        d={paths[props.state].d}
        fill={pathFIll()}
        fill-rule={paths[props.state].fillRule}
        ref={pathEl!}
      />
    </svg>
  )
}

const containerVariants = cva({
  base: 'flex items-center justify-center gap-5',
  variants: {
    orientation: {
      horizontal: 'flex-row px-5 py-2',
      vertical: 'flex-col px-2 py-5'
    }
  }
})

const sliderRootVariants = cva({
  base: 'relative flex touch-none select-none items-center',
  defaultVariants: {
    orientation: 'horizontal'
  },
  variants: {
    orientation: {
      horizontal: 'w-full flex-row',
      vertical: 'h-full min-h-[5rem] flex-col'
    }
  }
})

const sliderTrackVariants = cva({
  base: ['relative z-0 grow bg-[#C7C7C7]'],
  defaultVariants: {
    orientation: 'horizontal'
  },
  variants: {
    orientation: {
      horizontal: 'h-1 w-full',
      vertical: 'h-full w-1'
    }
  }
})

const sliderFillVariants = cva({
  base: 'absolute rounded-full bg-[#1A1A1A]',
  defaultVariants: {
    orientation: 'horizontal'
  },
  variants: {
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full'
    }
  }
})

const sliderThumbVariants = cva({
  base: 'block size-4 rounded-full bg-[#1A1A1A] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  defaultVariants: {
    orientation: 'horizontal'
  },
  variants: {
    orientation: {
      horizontal: 'top-[-0.375rem]',
      vertical: 'left-[-0.375rem]'
    }
  }
})

const stateSchema = createGridCellStateScheme({
  columnEnd: 5,
  columnStart: 1,
  rowEnd: 6,
  rowStart: 5
})
  .extend({
    interval: withMetadata(z.coerce.number().min(100).default(200), {
      description: 'Duration between each step increase when playing.',
      label: 'Interval'
    }),
    max: withMetadata(z.coerce.number().default(1), {
      description: 'Minimum value of the slider',
      label: 'Max'
    }),
    min: withMetadata(z.coerce.number().default(0), {
      description: 'Maximum value of the slider',
      label: 'Min'
    }),
    onStateChange: withMetadata(z.string().optional(), {
      description: 'Enter javascript code that is run on slider value change.',
      label: 'On state change'
    }),
    onValueChange: withMetadata(z.string().optional(), {
      description: 'Enter javascript code that is run on slider state change.',
      label: 'On value change'
    }),
    state: withMetadata(z.enum(['playing', 'paused']).default('paused'), {
      description: 'Controlled state of the slider',
      label: 'State'
    }),
    step: withMetadata(z.coerce.number().default(0.1), {
      description: 'Step value of the slider',
      label: 'Step'
    }),
    value: withMetadata(z.coerce.number().default(0), {
      description: 'Controlled value of the slider',
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

const component: Component<AppletNodeRenderProps> = (props) => {
  const [state, { boundFunctions, setState }] = useBlackboard(
    () => props.id,
    stateSchema
  )
  const orientation = () => {
    const { columnEnd, columnStart, rowEnd, rowStart } = state
    return rowEnd - rowStart > columnEnd - columnStart
      ? 'vertical'
      : 'horizontal'
  }

  // defer: true ensures only for changes
  createEffect(
    on(() => state.value, boundFunctions.onValueChange, { defer: true })
  )
  createEffect(
    on(() => state.state, boundFunctions.onStateChange, { defer: true })
  )

  const handleValueChange = ([value]: number[]) => {
    const current = state.state
    if (current !== 'paused') {
      // Force pause the animation if the slider was updated via the thumb.
      setState('state', 'paused')
    }
    setState('value', value)
  }

  const handleClick = () => {
    const currentState = state.state
    const max = state.max
    const min = state.min
    const currentValue = state.value
    if (currentState === 'playing') {
      setState('state', 'paused')
    } else {
      let value = currentValue
      if (value >= max) {
        value = min
        setState('value', value)
      }
      setState('state', 'playing')
    }
  }

  createEffect(() => {
    const delay = state.state === 'playing' ? state.interval : null
    if (delay == null) return
    const id = setInterval(() => {
      setState(
        produce((s) => {
          const newValue = s.value + s.step
          if (newValue >= s.max) {
            s.value = s.max
            s.state = 'paused'
            return
          }

          s.value = newValue
        })
      )
    }, delay)
    onCleanup(() => clearInterval(id))
  })

  const iconState = () => {
    const { max, state: currentState, value } = state
    return currentState === 'playing'
      ? 'pause'
      : currentState === 'paused' && value >= max
        ? 'replay'
        : 'play'
  }

  return (
    <GridCell
      class={containerVariants({ orientation: orientation() })}
      state={state}
    >
      <button
        class='rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none'
        onClick={handleClick}
      >
        <Icon state={iconState()} />
      </button>
      <Slider.Root
        class={sliderRootVariants({ orientation: orientation() })}
        maxValue={state.max}
        minValue={state.min}
        onChange={handleValueChange}
        orientation={orientation()}
        step={state.step}
        value={[state.value]}
      >
        <Slider.Track
          class={sliderTrackVariants({ orientation: orientation() })}
        >
          <Slider.Fill
            class={sliderFillVariants({ orientation: orientation() })}
          />
          <Slider.Thumb
            class={sliderThumbVariants({ orientation: orientation() })}
          />
        </Slider.Track>
      </Slider.Root>
    </GridCell>
  )
}

export { component, stateSchema }
