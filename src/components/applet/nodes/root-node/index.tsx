import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

import { Card } from '@/components/ui/card'

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  return (
    <Card class='box-border flex min-h-full flex-col justify-between bg-white text-[#1A1A1A]'>
      {props.children}
    </Card>
  )
}

const children = ['header', 'grid', 'footer', 'behaviour']

export { children, component }
