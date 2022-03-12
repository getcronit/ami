import {IJaenPage} from '../../../pages/types'
import React from 'react'
import {store} from '../redux'

export const usePagesChanges = () => {
  const [totalChanges, setTotalChanges] = React.useState(0)

  React.useEffect(() => {
    const calculateTotalChanges = () => {
      const allJaenPage = store.getState().internal.pages.nodes
      let total = 0

      const calculateJaenFieldsTotalChanges = (
        jaenFields?: IJaenPage['jaenFields'] | null
      ) => {
        let total = 0

        if (!jaenFields) {
          return total
        }

        for (const key in jaenFields) {
          if (jaenFields[key]) {
            const element = jaenFields[key]

            total += Object.values(element).length
          }
        }

        return total
      }

      for (const pageId in allJaenPage) {
        const page = allJaenPage[pageId]

        total += calculateJaenFieldsTotalChanges(page.jaenFields)

        const jaenFiles = page.jaenFiles
        if (jaenFiles) {
          total += Object.keys(jaenFiles).length
        }

        for (const chapterId in page.chapters) {
          const chapter = page.chapters[chapterId]

          for (const sectionId in chapter.sections) {
            const section = chapter.sections[sectionId]

            total += calculateJaenFieldsTotalChanges(section.jaenFields)
            total++
          }
          total++
        }

        total++
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
