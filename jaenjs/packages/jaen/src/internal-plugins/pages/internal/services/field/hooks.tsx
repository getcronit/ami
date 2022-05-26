import React from 'react'
import {IJaenPage} from '../../../types'
import {store, useAppDispatch} from '../../redux'
import {internalActions} from '../../redux/slices'
import {useJaenPageContext} from '../page'
import {JaenSectionType, useJaenSectionContext} from '../section'

export const useField = <IValue extends {}>(name: string, type: string) => {
  const {jaenPage} = useJaenPageContext()

  if (!jaenPage.id) {
    throw new Error(
      'JaenPage id is undefined! connectField must be used within a JaenPage'
    )
  }

  const sectionContext = useJaenSectionContext()

  const dispatch = useAppDispatch()

  function getPageField(
    page: IJaenPage | Partial<IJaenPage> | null
  ): IValue | undefined {
    if (page) {
      let fields

      if (!sectionContext) {
        fields = page.jaenFields
      } else {
        const {chapterName, sectionId} = sectionContext

        fields = page.chapters?.[chapterName]?.sections[sectionId]?.jaenFields
      }

      return fields?.[type]?.[name]
    }
  }

  const getValue = () => {
    const state = store.getState()

    const page = state.internal.pages.nodes[jaenPage.id]

    if (page) {
      return getPageField(page)
    }
  }

  const getStaticValue = () => {
    const page = jaenPage

    if (page) {
      return getPageField(page)
    }
  }

  const [value, setValue] = React.useState<IValue | undefined>(getValue)

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newValue = getValue()

      if (newValue !== value) {
        setValue(newValue)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [value])

  const staticValue = getStaticValue()

  const getIsEditing = () => {
    const state = store.getState()

    return state.internal.status.isEditing
  }

  const [isEditing, setIsEditing] = React.useState(getIsEditing)

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newIsEditing = getIsEditing()

      if (newIsEditing !== isEditing) {
        setIsEditing(newIsEditing)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [isEditing])

  const write = React.useCallback(
    (newValue: IValue | null) => {
      console.log('write', newValue)

      dispatch(
        internalActions.field_write({
          pageId: jaenPage.id,
          section: sectionContext,
          fieldType: type,
          fieldName: name,
          value: newValue
        })
      )
    },
    [dispatch, jaenPage.id, sectionContext, type, name, value]
  )

  const register = React.useCallback(
    (props: any) => {
      dispatch(
        internalActions.field_register({
          pageId: jaenPage.id,
          type,
          name,
          chapter: sectionContext
            ? {
                name: sectionContext.chapterName,
                sectionId: sectionContext.sectionId
              }
            : undefined,
          props
        })
      )
    },
    [dispatch, jaenPage.id, sectionContext, type, name]
  )

  return {
    value,
    staticValue,
    jaenPageId: jaenPage.id,
    isEditing,
    sectionContext,
    write,
    register
  }
}
