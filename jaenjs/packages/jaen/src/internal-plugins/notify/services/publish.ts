// pages
// snekfinder root url
import {store} from '../redux'
import {INotification} from '../types'

type DataType = {
  notifications:
    | {
        [notificationId: string]: Partial<INotification>
      }
    | undefined
}

const getNotifications = (): DataType['notifications'] | undefined => {
  const state = store.getState()
  if (state) {
    return state.internal.notifications.nodes
  }
}

export const runPublish = async () => {
  const data: DataType = {
    notifications: getNotifications()
  }

  return data
}
