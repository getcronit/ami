import React from 'react'
import {store} from '../redux'

export const useCoreChanges = () => {
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
