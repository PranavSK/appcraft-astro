import type { Node, RenderableTreeNodes, ValidateError } from '@markdoc/markdoc'
import type { Accessor, Setter } from 'solid-js'

import { createContext, useContext } from 'solid-js'

interface SandboxContextData {
  ast: Accessor<Node>
  content: Accessor<string>
  errors: Accessor<ValidateError[]>
  renderNodes: Accessor<RenderableTreeNodes>
  setContent: Setter<string>
}

const sandboxContext = createContext<SandboxContextData | null>(null)
export const SandboxContextProvider = sandboxContext.Provider
export const useSandboxContext = () => {
  const context = useContext(sandboxContext)
  if (context === null) {
    throw new Error('SandboxContextProvider is missing')
  }

  return context
}
