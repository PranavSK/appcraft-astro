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
        d='M12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C11.64 19.5 11.28 19.5 10.92 19.45C10.9714 19.1359 10.9982 18.8183 11 18.5C11 17.94 10.92 17.38 10.76 16.84C11.17 16.94 11.58 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 12.29 7.03 12.59 7.08 12.88C6.42 12.63 5.71 12.5 5 12.5C3.83 12.5 2.69 12.84 1.71 13.5C1.44 13 1.2 12.5 1 12C2.73 7.61 7 4.5 12 4.5ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9ZM6 15V17H2V19H6V21L9 18L6 15Z'
        fill='currentColor'
      />
    </svg>
  )
}
