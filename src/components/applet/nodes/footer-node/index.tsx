import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

const children = ['cta']
const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  return (
    <div class='z-20 m-5 flex items-center justify-center gap-5'>
      {props.children}
    </div>
  )
}

export { children, component }
