import type { Component, ComponentProps } from 'solid-js'

export const Icon: Component<ComponentProps<'svg'>> = (props) => {
  return (
    <svg
      fill='none'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M10.5 3C12.2239 3 13.8772 3.68482 15.0962 4.90381C16.3152 6.12279 17 7.77609 17 9.5C17 11.11 16.41 12.59 15.44 13.73L15.71 14H16.5L21.5 19L20 20.5L15 15.5V14.71L14.73 14.44C13.5505 15.4468 12.0507 15.9999 10.5 16C8.77609 16 7.12279 15.3152 5.90381 14.0962C4.68482 12.8772 4 11.2239 4 9.5C4 7.77609 4.68482 6.12279 5.90381 4.90381C7.12279 3.68482 8.77609 3 10.5 3ZM10.5 5C8 5 6 7 6 9.5C6 12 8 14 10.5 14C13 14 15 12 15 9.5C15 7 13 5 10.5 5Z'
        fill='currentColor'
      />
    </svg>
  )
}
