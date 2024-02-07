import type { AppletNodeRenderProps } from '@/components/applet/nodes'
import type { ParentComponent } from 'solid-js'

const children = [
  'paragraph',
  'block-latex',
  'geogebra',
  'rect',
  'slider',
  'animated-slider',
  'stepper',
  'radio-group',
  'checkbox-group',
  'button-group',
  'table',
  'weighing-scale'
]

const component: ParentComponent<AppletNodeRenderProps> = (props) => {
  return (
    <div class='z-10 m-5 grid grid-cols-6 grid-rows-applet gap-5'>
      {props.children}
    </div>
  )
}

export { children, component }
