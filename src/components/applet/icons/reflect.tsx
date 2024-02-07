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
      <g clip-path='url(#clip0_4662_30558)'>
        <path
          d='M7.19997 5.6H7.99997C7.99996 5.41985 7.93915 5.24499 7.82738 5.10371C7.71561 4.96242 7.55943 4.863 7.38412 4.82154C7.20881 4.78007 7.02464 4.79899 6.86142 4.87522C6.6982 4.95146 6.56549 5.08055 6.48477 5.2416L7.19997 5.6ZM7.19997 18.4V19.2C7.41215 19.2 7.61563 19.1157 7.76566 18.9657C7.91569 18.8157 7.99997 18.6122 7.99997 18.4H7.19997ZM0.799973 18.4L0.0847733 18.0416C0.0236559 18.1636 -0.0052561 18.2991 0.000784822 18.4354C0.00682574 18.5717 0.0476189 18.7042 0.119288 18.8203C0.190956 18.9364 0.291119 19.0322 0.410257 19.0986C0.529396 19.1651 0.663551 19.2 0.799973 19.2V18.4ZM16.8 5.6L17.5152 5.2416C17.4345 5.08055 17.3017 4.95146 17.1385 4.87522C16.9753 4.79899 16.7911 4.78007 16.6158 4.82154C16.4405 4.863 16.2843 4.96242 16.1726 5.10371C16.0608 5.24499 16 5.41985 16 5.6H16.8ZM16.8 18.4H16C16 18.6122 16.0843 18.8157 16.2343 18.9657C16.3843 19.1157 16.5878 19.2 16.8 19.2V18.4ZM23.2 18.4V19.2C23.3364 19.2 23.4706 19.1651 23.5897 19.0986C23.7088 19.0322 23.809 18.9364 23.8807 18.8203C23.9523 18.7042 23.9931 18.5717 23.9992 18.4354C24.0052 18.2991 23.9763 18.1636 23.9152 18.0416L23.2 18.4ZM6.39997 5.6V18.4H7.99997V5.6H6.39997ZM7.19997 17.6H0.799973V19.2H7.19997V17.6ZM1.51517 18.7584L7.91517 5.9584L6.48477 5.2416L0.0847733 18.0416L1.51517 18.7584ZM16 5.6V18.4H17.6V5.6H16ZM16.8 19.2H23.2V17.6H16.8V19.2ZM23.9152 18.0416L17.5152 5.2416L16.0848 5.9584L22.4848 18.7584L23.9152 18.0416ZM11.2 0V24H12.8V0H11.2Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_4662_30558'>
          <rect fill='currentColor' height='24' width='24' />
        </clipPath>
      </defs>
    </svg>
  )
}