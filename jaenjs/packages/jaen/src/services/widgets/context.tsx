import * as React from 'react'
import {IJaenConnection} from '../../types'

export type WidgetOptions = {
  name: string
  Icon: React.ComponentType<{}>
}

export const WidgetContext = React.createContext<{} | undefined>(undefined)

export interface ViewProviderProps extends WidgetOptions {}

export const WidgetProvider: React.FC<
  React.PropsWithChildren<ViewProviderProps>
> = ({children}) => {
  return <WidgetContext.Provider value={{}}>{children}</WidgetContext.Provider>
}

export const connectWidget = <P extends {}>(
  Component: React.ComponentType<P>,
  options: WidgetOptions
) => {
  const MyComp: IJaenConnection<P, typeof options> = props => {
    return (
      <WidgetProvider {...options}>
        <Component {...props} />
      </WidgetProvider>
    )
  }

  MyComp.options = options

  return MyComp
}

export type IWidgetConnection = ReturnType<typeof connectWidget>
