import React from 'react'
import {IJaenPage} from '../../../pages/types'
import {store} from '../redux'

export const calculateJaenFieldsTotalChanges = (
  jaenFields?: IJaenPage['jaenFields'] | null
) => {
  let total = 0

  if (!jaenFields) {
    return total
  }

  for (const key in jaenFields) {
    if (jaenFields[key]) {
      const element = jaenFields[key]

      total +=
        Object.values(element)
          .map(e => JSON.stringify(e.value)?.length)
          .reduce((a, b) => a + b, 0) || 0
    }
  }

  return total
}

export const usePagesChanges = () => {
  const [totalChanges, setTotalChanges] = React.useState(0)

  React.useEffect(() => {
    const calculateTotalChanges = () => {
      const allJaenPage = store.getState().internal.pages.nodes
      let total = 0

      for (const pageId in allJaenPage) {
        const page = allJaenPage[pageId]

        total += calculateJaenFieldsTotalChanges(page.jaenFields)

        const iterateSections = (sections: IJaenPage['sections']) => {
          for (const sectionId in sections) {
            const section = sections[sectionId]

            for (const item of section.items) {
              const jaenFields = item.jaenFields
              if (jaenFields) {
                total += calculateJaenFieldsTotalChanges(item.jaenFields)
              }

              if (item.sections) {
                iterateSections(item.sections)
              }
            }
          }
        }

        if (page.sections) {
          iterateSections(page.sections)
        }
      }

      return total
    }

    setTotalChanges(calculateTotalChanges())

    const unsubscribe = store.subscribe(() => {
      setTotalChanges(calculateTotalChanges())
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return totalChanges
}
