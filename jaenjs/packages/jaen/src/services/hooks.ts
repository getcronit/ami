import React from 'react'
import {store as pagesStore} from '../internal-plugins/pages/internal/redux'
import {usePagesChanges} from '../internal-plugins/pages/internal/services/hooks'
import {store} from '../redux'

const useCoreChanges = () => {
  const [totalChanges, setTotalChanges] = React.useState(0)

  React.useEffect(() => {
    const calculateTotalChanges = () => {
      const siteMetadata = store.getState().site.siteMetadata
      let total = Object.keys(siteMetadata).length

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

export const useChanges = () => {
  const coreChanges = useCoreChanges()
  const pagesChanges = usePagesChanges()

  const totalChanges = coreChanges + pagesChanges

  return {coreChanges, pagesChanges, totalChanges}
}

export const useIsEditing = () => {
  const [isEditing, setIsEditing] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = pagesStore.subscribe(() => {
      setIsEditing(pagesStore.getState().internal.status.isEditing)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return isEditing
}
