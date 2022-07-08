import React from 'react'
import {isAuthenticated} from '../../../../../utils/hooks/isAuthenticated'
import {IJaenPage} from '../../../../pages/types'
import {store, useAppDispatch, withRedux} from '../../redux'
import {internalActions} from '../../redux/slices'

export interface JaenPageProviderProps {
  jaenPage: {
    id: string
  } & Partial<IJaenPage>
  jaenPages?: Array<Partial<IJaenPage>>
  unregisterFields?: boolean
}

export interface JaenPageContext extends JaenPageProviderProps {}

export const JaenPageContext =
  React.createContext<JaenPageContext | undefined>(undefined)

const UnregisterFieldsHelper = withRedux(() => {
  const {jaenPage} = useJaenPageContext()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(
      internalActions.page_unregisterFields({
        pageId: jaenPage.id
      })
    )
  }, [jaenPage.id])

  return null
})

export const JaenPageProvider: React.FC<JaenPageProviderProps> = ({
  children,
  jaenPage,
  jaenPages,
  unregisterFields = true
}) => {
  return (
    <JaenPageContext.Provider
      value={{
        jaenPage,
        jaenPages
      }}>
      {unregisterFields && isAuthenticated() && <UnregisterFieldsHelper />}
      {children}
    </JaenPageContext.Provider>
  )
}

/**
 * Access the JaenPageContext.
 *
 * @example
 * ```
 * const {jaenPage} = useJaenPageContext()
 * ```
 */
export const useJaenPageContext = () => {
  const context = React.useContext(JaenPageContext)

  if (context === undefined) {
    throw new Error('useJaenPageContext must be within JaenPageContext')
  }

  return context
}

export interface UsePageIndexProps {
  /**
   * Opts out the field from the page content on which it is applied.
   * Instead the page context of the provided jaenPageId will be used.
   */
  jaenPageId?: string
  filter?: (page: Partial<IJaenPage>) => boolean
  sort?: (a: Partial<IJaenPage>, b: Partial<IJaenPage>) => number
}

export const useJaenPageIndex = (
  props?: UsePageIndexProps
): {
  children: Array<{id: string} & Partial<IJaenPage>>
  withJaenPage: (childId: string, children: React.ReactNode) => React.ReactNode
} => {
  let {jaenPage, jaenPages} = useJaenPageContext()

  let id = jaenPage.id
  let staticChildren = jaenPage.children

  if (props?.jaenPageId && props?.jaenPageId !== id) {
    id = props?.jaenPageId

    if (jaenPages) {
      staticChildren = jaenPages.find(page => page.id === id)?.children
    } else {
      console.warn('There are no jaenPages in the context')
    }
  }

  const [dynamicChildrenIds, setDynamicChildrenIds] = React.useState(
    store.getState().internal.pages.nodes[id]?.children
  )

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      const page = state.internal.pages.nodes[id]
      if (page) {
        setDynamicChildrenIds(page.children)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [id])

  const dynamicChildren = React.useMemo(() => {
    if (dynamicChildrenIds) {
      const dynamicJaenPages = store.getState().internal.pages.nodes
      return dynamicChildrenIds.map(({id}) => ({
        id,
        ...dynamicJaenPages[id]
      })) as IJaenPage[]
    }

    return []
  }, [dynamicChildrenIds])

  staticChildren = staticChildren || []

  // merge children with staticChildren by id
  let children = [...staticChildren, ...dynamicChildren]

  children = children.filter(c => !c.excludedFromIndex)

  if (props) {
    const {filter, sort} = props

    if (filter) {
      children = children.filter(filter)
    }

    if (sort) {
      children = children.sort(sort)
    }
  }

  return {
    children,
    withJaenPage: (childId: string, children: React.ReactNode) => {
      const jaenPage = staticChildren?.find(c => c.id === childId)

      return (
        <JaenPageProvider jaenPage={{...jaenPage, id: childId}} key={childId}>
          {children}
        </JaenPageProvider>
      )
    }
  }
}
