import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { Component } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { withMetadata } from '@/lib/zod'
import { z } from 'zod'

const stateSchema = z.object({
  alt: withMetadata(z.coerce.string().default('Sample image'), {
    description: 'Enter the alt text for the image.',
    label: 'Alt Text'
  }),
  src: withMetadata(
    z.coerce.string().url().default('https://picsum.photos/32'),
    {
      description: 'Enter the URL of the image to display.',
      label: 'Image URL'
    }
  )
})

const component: Component<AppletNodeRenderProps> = (props) => {
  const [state] = useBlackboard(() => props.id, stateSchema)

  return <img alt={state.alt} class='inline h-[1.21em]' src={state.src} />
}

export { component, stateSchema }
