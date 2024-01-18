import type { ParentComponent } from 'solid-js'

import createEmblaCarousel from 'embla-carousel-solid'

import { ChevronLeft, ChevronRight } from '../icons'
import { Button } from '../ui/button'

export const Document: ParentComponent = (props) => {
  const [emblaRef, emblaApi] = createEmblaCarousel()

  const keydownHandler = (event: KeyboardEvent) => {
    const api = emblaApi()
    if (api) {
      if (event.key === 'ArrowLeft') {
        api.scrollPrev()
      } else if (event.key === 'ArrowRight') {
        api.scrollNext()
      }
    }
  }

  const rightButtonHandler = () => {
    const api = emblaApi()
    if (api) {
      api.scrollNext()
    }
  }

  const leftButtonHandler = () => {
    const api = emblaApi()
    if (api) {
      api.scrollPrev()
    }
  }

  return (
    <>
      <main
        aria-roledescription='full-page'
        class='overflow-hidden'
        onKeyDown={keydownHandler}
        ref={emblaRef}
        role='region'
      >
        <article class='grid auto-cols-[100vw] grid-flow-col'>
          {props.children}
        </article>
      </main>
      <nav class='absolute top-1 flex w-full justify-between'>
        <Button onClick={leftButtonHandler} size='icon' variant='ghost'>
          <ChevronLeft />
        </Button>
        <Button onClick={rightButtonHandler} size='icon' variant='ghost'>
          <ChevronRight />
        </Button>
      </nav>
    </>
  )
}

export const Page: ParentComponent = (props) => {
  return <section class='prose h-dvh max-w-none p-10'>{props.children}</section>
}
