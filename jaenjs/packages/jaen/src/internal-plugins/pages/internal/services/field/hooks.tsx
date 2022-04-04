import React from 'react'
import {IJaenPage} from '../../../types'
import {store} from '../../redux'
import {useJaenPageContext} from '../page'
import {useJaenSectionContext} from '../section'

export const useField = <IValue extends {}>(name: string, type: string) => {
  const {jaenPage} = useJaenPageContext()

  if (!jaenPage.id) {
    throw new Error(
      'JaenPage id is undefined! connectField must be used within a JaenPage'
    )
  }

  const sectionContext = useJaenSectionContext()

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

  return {
    value,
    staticValue,
    jaenPageId: jaenPage.id,
    isEditing,
    sectionContext
  }
}
