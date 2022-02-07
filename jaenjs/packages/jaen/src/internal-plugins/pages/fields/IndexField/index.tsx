import {useAppSelector, withRedux} from '../../internal/redux'
import {
  JaenPageProvider,
  useJaenPageContext
} from '../../internal/services/page'
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

export const IndexField = withRedux((props: IndexFieldProps) => {
  let {jaenPage, jaenPages} = useJaenPageContext()

  let id = jaenPage.id
  let staticChildren = jaenPage.children

  if (props.jaenPageId && props.jaenPageId !== id) {
    id = props.jaenPageId

    if (jaenPages) {
      staticChildren = jaenPages.find(page => page.id === id)?.children
    } else {
      console.warn('There are no jaenPages in the context')
    }
  }

  let dynamicChildren = useAppSelector(
    state => state.internal.pages.nodes[id]?.children
  )

  staticChildren = staticChildren || []
  dynamicChildren = dynamicChildren || []

  // merge children with staticChildren by id
  let children = [...staticChildren, ...dynamicChildren]

  const {renderPage, filter, sort} = props

  if (filter) {
    children = children.filter(c => !c.excludedFromIndex).filter(filter)
  }

  if (sort) {
    children = children.sort(sort)
  }

  return (
    <>
      {children.map(child => {
        const jaenPage = staticChildren?.find(c => c.id === child.id)

        return (
          <JaenPageProvider jaenPage={{...jaenPage, id: child.id}}>
            {renderPage(child)}
          </JaenPageProvider>
        )
      })}
    </>
  )
})

export default IndexField
