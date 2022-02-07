import React from 'react'
import {store} from '../redux'
import {INotification} from '../types'

export const useNotificationChanges = () => {
  const [totalChanges, setTotalChanges] = React.useState(0)

  React.useEffect(() => {
    const calculateTotalChanges = () => {
      const allNotificaiton = store.getState().internal.notifications.nodes
      let total = 0

      const calculateJaenFieldsTotalChanges = (
        jaenFields?: INotification['jaenFields'] | null
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
