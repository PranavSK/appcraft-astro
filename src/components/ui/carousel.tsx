import EmblaCarousel, {
  type EmblaCarouselType as CarouselApi,
  type EmblaOptionsType as CarouselOptions,
  type EmblaPluginType as CarouselPlugin
} from 'embla-carousel'
import {
  type Accessor,
  type Component,
  type ComponentProps,
  createContext,
  createEffect,
  createSignal,
  on,
  onCleanup,
  type Setter,
  splitProps,
  untrack,
  useContext
} from 'solid-js'

import { cx } from '@/lib/utils'

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface CustomCaptureEvents {
      keydown: KeyboardEvent
    }
  }
}

interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin[]
  orientation?: 'horizontal' | 'vertical'
}

interface CarouselContextProps extends CarouselProps {
  carouselApi: Accessor<CarouselApi | undefined>
  setViewport: Setter<HTMLDivElement | undefined>
  canScrollPrev: Accessor<boolean>
  canScrollNext: Accessor<boolean>
  scrollPrev: () => void
  scrollNext: () => void
}

const carouselContext = createContext<CarouselContextProps | null>(null)
function useCarouselContext() {
  const context = useContext(carouselContext)
  if (!context)
    throw new Error('useCarousel must be used within a <Carousel />')

  return context
}

const Carousel: Component<CarouselProps & ComponentProps<'div'>> = (props) => {
  const [carouselProps, cxProps, rest] = splitProps(
    props,
    ['opts', 'plugins', 'orientation'],
    ['class']
  )

  const [viewport, setViewport] = createSignal<HTMLDivElement>()
  const [carouselApi, setCarouselApi] = createSignal<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = createSignal(false)
  const [canScrollNext, setCanScrollNext] = createSignal(false)

  createEffect(() => {
    const viewportElement = viewport()
    // Have the api reinit if these change instead of new carousel construction
    const { opts, plugins, orientation } = untrack(() => carouselProps)
    if (!viewportElement) return
    const api = EmblaCarousel(
      viewportElement,
      {
        ...opts,
        axis: orientation === 'vertical' ? 'y' : 'x'
      },
      plugins
    )
    setCarouselApi(api)
  })

  createEffect(() => {
    on(
      () => carouselProps,
      ({ opts, plugins, orientation }) =>
        carouselApi()?.reInit(
          {
            ...opts,
            axis: orientation === 'vertical' ? 'y' : 'x'
          },
          plugins
        )
    )
  })

  createEffect(() => {
    const api = carouselApi()
    if (!api) return

    function onCarouselSelect(api: CarouselApi) {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    onCarouselSelect(api)
    api.on('select', onCarouselSelect)
    api.on('reInit', onCarouselSelect)

    onCleanup(() => {
      api.off('select', onCarouselSelect)
      api.off('reInit', onCarouselSelect)
    })
  })

  function scrollPrev() {
    carouselApi()?.scrollPrev()
  }

  function scrollNext() {
    carouselApi()?.scrollNext()
  }

  return (
    <carouselContext.Provider
      value={{
        carouselApi,
        setViewport,
        canScrollNext,
        canScrollPrev,
        scrollNext,
        scrollPrev,
        ...carouselProps
      }}
    >
      <div
        class={cx('relative', cxProps.class)}
        oncapture:keydown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            scrollPrev()
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            scrollNext()
          }
        }}
        role='region'
        aria-roledescription='carousel'
        {...rest}
      />
    </carouselContext.Provider>
  )
}

const CarouselViewport: Component<ComponentProps<'div'>> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])
  const { setViewport, orientation } = useCarouselContext()
  return (
    <div class='overflow-hidden' ref={setViewport}>
      <div
        class={cx(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          cxProps.class
        )}
        {...rest}
      />
    </div>
  )
}

const CarouselItem: Component<ComponentProps<'div'>> = (props) => {
  const [cxProps, rest] = splitProps(props, ['class'])
  const { orientation } = useCarouselContext()
  return (
    <div
      role='group'
      aria-roledescription='slide'
      class={cx(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        cxProps.class
      )}
      {...rest}
    />
  )
}

export { Carousel, type CarouselApi, CarouselItem, CarouselViewport }
