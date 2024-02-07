import type { ParentComponent } from 'solid-js'

import { useBlackboard } from '@/components/applet/blackboard'
import { stateSchema } from '@/components/applet/nodes/group-node'
import { Show, createMemo, getOwner, runWithOwner } from 'solid-js'

interface ShowWhenGroupProps {
  groups: ReadonlyArray<string> | undefined
}
export const ShowWhenGroup: ParentComponent<ShowWhenGroupProps> = (props) => {
  const owner = getOwner()
  const isActive = createMemo(() => {
    return props.groups
      ? props.groups
          .map(
            (group) =>
              runWithOwner(owner, () =>
                useBlackboard(() => group, stateSchema)
              )!
          )
          .reduce(
            (cumulative, [current]) => cumulative || current.active,
            false
          )
      : true
  })
  return <Show when={isActive}>{props.children}</Show>
}
