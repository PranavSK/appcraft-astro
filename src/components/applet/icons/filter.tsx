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
        d='M11.0003 20C10.7169 20 10.4793 19.904 10.2873 19.712C10.0953 19.52 9.99959 19.2827 10.0003 19V13L4.20025 5.6C3.95025 5.26667 3.91259 4.91667 4.08725 4.55C4.26192 4.18333 4.56625 4 5.00025 4H19.0003C19.4336 4 19.7379 4.18333 19.9133 4.55C20.0886 4.91667 20.0509 5.26667 19.8003 5.6L14.0003 13V19C14.0003 19.2833 13.9043 19.521 13.7123 19.713C13.5203 19.905 13.2829 20.0007 13.0003 20H11.0003Z'
        fill='currentColor'
      />
    </svg>
  )
}
