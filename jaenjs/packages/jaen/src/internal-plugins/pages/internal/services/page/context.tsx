import {IJaenPage} from '../../../../pages/types'
import {graphql} from 'gatsby'
import React from 'react'
import {store} from '../../redux'

export interface JaenPageContext {
  jaenPage: {
    id: string
  } & Partial<IJaenPage>
  jaenPages?: Array<Partial<IJaenPage>>
}

export const JaenPageContext = React.createContext<JaenPageContext | undefined>(
  undefined
)

export const JaenPageProvider: React.FC<JaenPageContext> = ({
  children,
  jaenPage,
  jaenPages
}) => {
  return (
    <JaenPageContext.Provider
      value={{
        jaenPage,
        jaenPages
      }}>
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

/**
 * @type {Fragment}
 *
 * @example
 * ```
 * export const query = graphql`
 *  query ($jaenPageId: String!) {
 *   ...JaenPageQuery
 *  }
 * `
 * ```
 */
export const JaenPageQuery = graphql`
  fragment JaenPageQuery on Query {
    jaenPage(id: {eq: $jaenPageId}) {
      ...JaenPageData
    }
  }
`

/**
 * @type {Fragment}
 *
 * @example
 * ```
 * export const query = graphql`
 *  query ($jaenPageId: String!) {
 *   jaenPage(id: {eq: $jaenPageId}) {
 *    ...JaenPageData
 *    }
 *  }
 * `
 * ```
 */
export const JaenPageData = graphql`
  fragment JaenPageData on JaenPage {
    id
    slug
    jaenFields
    jaenPageMetadata {
      title
      isBlogPost
      image
      description
      datePublished
      canonical
    }
    jaenFiles {
      file {
        id
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
    chapters
  }
`

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
