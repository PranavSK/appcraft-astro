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
      <g clip-path='url(#clip0_3456_226084)'>
        <path
          d='M10 23V21H5C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.99934 19.5493 3 19V5C3 4.45 3.196 3.979 3.588 3.587C3.98 3.195 4.45067 2.99933 5 3H10V1H12V23H10ZM5 18H10V12L5 18ZM14 21V12L19 18V5H14V3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.804 20.021 20.412 20.413C20.02 20.805 19.5493 21.0007 19 21H14Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_3456_226084'>
          <rect fill='currentColor' height='24' width='24' />
        </clipPath>
      </defs>
    </svg>
  )
}
