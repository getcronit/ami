import * as React from 'react'
import {useAppDispatch} from '../../redux'
import {internalActions} from '../../redux/slices'
import {useJaenPageContext} from '../page'

export type JaenSectionType = {
  id: string
  path: Array<{
    fieldName: string
    sectionId?: string
  }>
}

export const SectionOptionsContext = React.createContext<
  {name: string; displayName: string} | undefined
>(undefined)

export const JaenSectionContext = React.createContext<
  | (JaenSectionType & {
      register: (props: object) => void
    })
  | undefined
>(undefined)

export const JaenSectionProvider: React.FC<JaenSectionType> = ({
  children,
  path,
  id
}) => {
  const {jaenPage} = useJaenPageContext()
  const dispatch = useAppDispatch()

  const register = React.useCallback(
    (props: object) => {
      dispatch(
        internalActions.section_register({
          pageId: jaenPage.id,
          path,
          props
        })
      )
    },
    [dispatch, jaenPage.id]
  )

  return (
    <JaenSectionContext.Provider
      value={{
        path,
        id,
        register
      }}>
      {children}
    </JaenSectionContext.Provider>
  )
}

/**
 * Access the JaenSectionContext.
 *
 * @example
 * ```
 * const { name } = useJaenSectionContext()
 * ```
 */
export const useJaenSectionContext = () => {
  const context = React.useContext(JaenSectionContext)

  return context
}
