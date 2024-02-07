import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

const children = ['text', 'line-break', 'inline-latex', 'inline-image']
const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  return <div class='text-center'>{props.children}</div>
}

export { children, component }
