import React from 'react'
import {IPageConnection, ITemplateConnection} from '../../../connectors'
import {withRedux} from '../../redux'
import {pageLoader, templateLoader} from '../componentLoader'
import {useDynamicRedirect} from '../routing/hooks'

export interface ISiteContext {
  templateLoader: (name: string) => Promise<ITemplateConnection>
  pageLoader: (name: string) => Promise<IPageConnection>
}

export const SiteContext =
  React.createContext<ISiteContext | undefined>(undefined)

export const SiteProvider: React.FC<React.PropsWithChildren<{}>> = withRedux(
  ({children}) => {
    useDynamicRedirect()

    return (
      <SiteContext.Provider
        value={{
          templateLoader: templateLoader,
          pageLoader: pageLoader
        }}>
        {children}
      </SiteContext.Provider>
    )
  }
)

/**
 * Access the SiteContext.
 *
 * @example
 * ```
 * const { jaen } = useSiteContext()
 * ```
 */
export const useSiteContext = () => {
  const context = React.useContext(SiteContext)

  if (context === undefined) {
    throw new Error('useSiteContext must be within SiteContextProvider')
  }

  return context
}
