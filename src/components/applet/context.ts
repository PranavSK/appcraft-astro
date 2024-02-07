import { createContext, useContext } from 'solid-js'

interface AppletContext {
  appletId: string
}
const appletContext = createContext<AppletContext | null>(null)

export const AppletContextProvider = appletContext.Provider
export const useAppletContext = () => {
  const context = useContext(appletContext)
  if (context == null) throw new Error('AppletContextProvider not found')
  return context
}
