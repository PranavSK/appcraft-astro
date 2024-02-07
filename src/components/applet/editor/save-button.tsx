import type {
  AppletSchemaNode,
  AppletSchemaRoot
} from '@/components/applet/schema'
import type { Component } from 'solid-js'

import { getBlackboard } from '@/components/applet/blackboard'
import { useAppletContext } from '@/components/applet/context'
import { getAppletGroups } from '@/components/applet/group'
import { getLayout } from '@/components/applet/layout'
import { getAppletNode } from '@/components/applet/nodes'
import { SaveButton as CmsSaveButton } from '@/components/cms/save-button'
import { trpc } from '@/lib/trpc/client'

export const SaveButton: Component = () => {
  const { appletId } = useAppletContext()

  const getApplet = () => {
    const layout = getLayout(appletId)
    const appletGroups = getAppletGroups(appletId)

    function recursiveMap(id: string) {
      const { stateSchema } = getAppletNode(id)
      const groups = appletGroups[id]
      const children = layout[id]
      const node: AppletSchemaNode = { id }
      if (stateSchema)
        node.initialState = getBlackboard(appletId, id, stateSchema)
      if (groups) node.groups = groups
      if (children) node.children = children.map(recursiveMap)
      return node
    }

    const applet: AppletSchemaRoot = {
      children: layout.root.map(recursiveMap),
      id: 'root'
    }

    return applet
  }

  return (
    <CmsSaveButton
      class='ml-auto'
      initialSlug={appletId}
      onSave={(slug, message) =>
        trpc.cms.save.mutate({
          body: JSON.stringify(getApplet()),
          collection: 'applet',
          extension: 'json',
          message,
          slug
        })
      }
    />
  )
}
