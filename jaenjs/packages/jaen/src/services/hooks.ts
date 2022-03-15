import React from 'react'
import {useNotificationChanges} from '../internal-plugins/notify/services/hooks'
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
  const notifyChanges = useNotificationChanges()

  const totalChanges = coreChanges + pagesChanges + notifyChanges

  return {coreChanges, pagesChanges, notifyChanges, totalChanges}
}
