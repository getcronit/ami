import React from 'react'
import {withRedux} from '../../internal/redux'
import {useJaenPageIndex} from '../../internal/services/page'
import {IJaenPage} from '../../types'

export interface IndexFieldProps {
  /**
   * Opts out the field from the page content on which it is applied.
   * Instead the page context of the provided jaenPageId will be used.
   */
  jaenPageId?: string
  /**
   * Provides page and wrapps the return jsx in a JaenPageProvider, thus allowing
   * to use fields.
   *
   * Filtering is done by the `filter` prop.
   */
  renderPage: (page: Partial<IJaenPage>) => JSX.Element
  filter?: (page: Partial<IJaenPage>) => boolean
  sort?: (a: Partial<IJaenPage>, b: Partial<IJaenPage>) => number
}

export const IndexField = withRedux(
  ({renderPage, ...rest}: IndexFieldProps) => {
    const {children, withJaenPage} = useJaenPageIndex(rest)
    return <>{children.map(page => withJaenPage(page.id, renderPage(page)))}</>
  }
)

export default IndexField
