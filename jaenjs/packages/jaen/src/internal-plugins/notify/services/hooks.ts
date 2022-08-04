import React from 'react'
import {calculateJaenFieldsTotalChanges} from '../../pages/internal/services/hooks'
import {store} from '../redux'

export const useNotificationChanges = () => {
  const [totalChanges, setTotalChanges] = React.useState(0)

  React.useEffect(() => {
    const calculateTotalChanges = () => {
      const allNotificaiton = store.getState().internal.notifications.nodes
      let total = 0

      for (const id in allNotificaiton) {
        const notification = allNotificaiton[id]

        total += calculateJaenFieldsTotalChanges(notification.jaenFields)

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
