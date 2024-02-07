import type { ParentComponent } from 'solid-js'

import { Separator } from '@/components/ui/separator'

import { LayoutTree } from './layout-tree'
import { SaveButton } from './save-button'

interface HierarchyPanelProps {}
export const HierarchyPanel: ParentComponent<HierarchyPanelProps> = (props) => {
  return (
    <div class='flex h-full flex-col'>
      <div class='relative flex h-10 select-none items-center gap-1 bg-background p-1'>
        {props.children}
        <SaveButton />
      </div>
      <Separator />
      <LayoutTree />
    </div>
  )
}
