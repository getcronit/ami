import * as React from 'react'
import {ISectionConnection} from '../../../connectors'
import {useAppDispatch} from '../../redux'
import {internalActions} from '../../redux/slices'
import {useJaenPageContext} from '../page'

export type JaenSectionType = {
  id: string
  path: Array<{
    fieldName: string
    sectionId?: string
  }>
  Component: ISectionConnection
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

export const JaenSectionProvider = React.memo<JaenSectionType>(
  ({path, id, Component}) => {
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
          Component,
          register
        }}>
        <Component />
      </JaenSectionContext.Provider>
    )
  }
)

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
