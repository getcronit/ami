import {withRedux} from '../../redux'
import React from 'react'
import {ITemplateConnection} from '../../../connectors'
import {useDynamicRedirect} from '../routing/hooks'

export interface ISiteContext {
  templateLoader: (name: string) => Promise<ITemplateConnection>
}

export const SiteContext = React.createContext<ISiteContext | undefined>(
  undefined
)

export const SiteProvider: React.FC<{}> = withRedux(({children}) => {
  const templateLoader = async (relativePath: string) => {
    //@ts-ignore
    return (await import(`${___JAEN_TEMPLATES___}/${relativePath}`)).default
  }

  useDynamicRedirect()

  return (
    <SiteContext.Provider
      value={{
        templateLoader
      }}>
      {children}
    </SiteContext.Provider>
  )
})

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
