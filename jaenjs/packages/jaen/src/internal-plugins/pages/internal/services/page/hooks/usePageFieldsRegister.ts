import {useAppSelector} from '../../../redux'
import {useStaticJaenPagesFieldsOrder} from './useStaticJaenPagesFieldsOrder'

export const usePageFieldsRegister = (jaenPageId: string) => {
  const pages = useStaticJaenPagesFieldsOrder()
  const jaenFieldsOrder = useAppSelector(
    state => state.internal.pages.nodes[jaenPageId]?.jaenFieldsOrder
  )

  if (jaenFieldsOrder) {
    return jaenFieldsOrder
  }

  const page = pages.find(page => page.id === jaenPageId)

  return page?.jaenFieldsOrder || []
}
