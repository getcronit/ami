import {INotification} from '../types'

export interface IJaenState {
  status: {
    isEditing: boolean
  }
  notifications: {
    nodes: {
      [id: string]: INotification
    }
    advanced: {
      [id: string]: {
        pageViews: number
      }
    }
  }
}
