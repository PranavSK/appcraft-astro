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
        d='M24.7149 4.18086L20.8201 0.286061C20.7297 0.19553 20.6223 0.123711 20.5041 0.0747101C20.3859 0.0257094 20.2592 0.000488281 20.1312 0.000488281C20.0032 0.000488281 19.8765 0.0257094 19.7583 0.0747101C19.6401 0.123711 19.5327 0.19553 19.4423 0.286061L7.75792 11.9704C7.66753 12.0609 7.59585 12.1684 7.54699 12.2866C7.49812 12.4048 7.47302 12.5314 7.47312 12.6593V16.5541C7.47312 16.8124 7.5757 17.06 7.75831 17.2426C7.94091 17.4252 8.18858 17.5278 8.44682 17.5278H12.3416C12.4695 17.5279 12.5962 17.5028 12.7144 17.454C12.8326 17.4051 12.94 17.3334 13.0305 17.243L24.7149 5.55864C24.8054 5.46821 24.8772 5.36082 24.9262 5.24262C24.9752 5.12441 25.0005 4.99771 25.0005 4.86975C25.0005 4.74179 24.9752 4.61509 24.9262 4.49688C24.8772 4.37867 24.8054 4.27129 24.7149 4.18086ZM11.9387 15.5804H9.42052V13.0622L17.2101 5.27262L19.7283 7.79084L11.9387 15.5804ZM21.1049 6.41428L18.5867 3.89605L20.1312 2.35152L22.6494 4.86975L21.1049 6.41428ZM24.026 11.6856V22.3963C24.026 22.9128 23.8208 23.4081 23.4556 23.7733C23.0904 24.1386 22.5951 24.3437 22.0786 24.3437H2.60462C2.08814 24.3437 1.59281 24.1386 1.22761 23.7733C0.862398 23.4081 0.657227 22.9128 0.657227 22.3963V2.92235C0.657227 2.40587 0.862398 1.91054 1.22761 1.54533C1.59281 1.18012 2.08814 0.974953 2.60462 0.974953H13.3153C13.5736 0.974953 13.8212 1.07754 14.0038 1.26014C14.1864 1.44275 14.289 1.69041 14.289 1.94865C14.289 2.20689 14.1864 2.45456 14.0038 2.63716C13.8212 2.81976 13.5736 2.92235 13.3153 2.92235H2.60462V22.3963H22.0786V11.6856C22.0786 11.4274 22.1812 11.1797 22.3638 10.9971C22.5464 10.8145 22.7941 10.7119 23.0523 10.7119C23.3105 10.7119 23.5582 10.8145 23.7408 10.9971C23.9234 11.1797 24.026 11.4274 24.026 11.6856Z'
        fill='currentColor'
      />
    </svg>
  )
}
