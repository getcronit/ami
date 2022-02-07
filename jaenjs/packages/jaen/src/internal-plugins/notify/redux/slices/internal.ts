import {combineReducers, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IJaenState} from '../types'

export const initialState: IJaenState = {
  status: {
    isEditing: false
  },
  notifications: {
    nodes: {},
    advanced: {}
  }
}

const statusSlice = createSlice({
  name: 'status',
  initialState: initialState.status,
  reducers: {
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload
    }
  }
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialState.notifications,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.nodes[action.payload] = {
        ...state.nodes[action.payload],
        active: true
      }
    },
    setInactive: (state, action: PayloadAction<string>) => {
      state.nodes[action.payload] = {
        ...state.nodes[action.payload],
        active: false
      }
    },
    field_write: (
      state,
      action: PayloadAction<{
        notificationId: string
        fieldType: string
        fieldName: string
        value: any
      }>
    ) => {
      const {notificationId, fieldType, fieldName, value} = action.payload

      state.nodes[notificationId] = {
        ...state.nodes[notificationId],
        id: notificationId,
        jaenFields: {
          ...(state.nodes[notificationId]?.jaenFields ?? {}),
          [fieldType]: {
            ...(state.nodes[notificationId]?.jaenFields?.[fieldType] ?? {}),
            [fieldName]: value
          }
        }
      }
    },
    increaseAdvancedPageViews: (state, action: PayloadAction<string>) => {
      const notificationId = action.payload
      if (!state.advanced[notificationId]) {
        state.advanced[notificationId] = {
          pageViews: 0
        }
      }

      state.advanced[notificationId].pageViews++
    }
  }
})

export const actions = {
  ...statusSlice.actions,
  ...notificationSlice.actions
}
export const reducers = {
  status: statusSlice.reducer,
  notifications: notificationSlice.reducer
}

export default combineReducers(reducers)
