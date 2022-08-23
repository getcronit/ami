import * as React from 'react'
import {IJaenConnection} from '../../../../types'

export type ViewOptions = {
  path: string
  displayName: string
  description: string
  Icon: React.ComponentType<{}>
  controls?: React.ReactNode[]
}

export const ViewContext = React.createContext<{} | undefined>(undefined)

export const useNotificationContext = () => {
  const context = React.useContext(ViewContext)
  if (context === undefined) {
    throw new Error(
      `useNotificationContext must be used within a NotificationProvider`
    )
  }
  return context
}

export interface ViewProviderProps extends ViewOptions {}

export const ViewProvider: React.FC<
  React.PropsWithChildren<ViewProviderProps>
> = ({children}) => {
  return <ViewContext.Provider value={{}}>{children}</ViewContext.Provider>
}

export const connectView = <P extends {}>(
  Component: React.ComponentType<P>,
  options: ViewOptions
) => {
  const MyComp: IJaenConnection<P, typeof options> = props => {
    return (
      <ViewProvider {...options}>
        <Component {...props} />
      </ViewProvider>
    )
  }

  MyComp.options = options

  return MyComp
}

export type IViewConnection = ReturnType<typeof connectView>
