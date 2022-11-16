import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IWidgets} from '../../types'

export const widgetsInitialState: IWidgets = {}

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState: widgetsInitialState,
  reducers: {
    writeData: (
      state,
      action: PayloadAction<{
        widgetName: string
        data: object
      }>
    ) => {
      state[action.payload.widgetName] = action.payload.data
    }
  }
})

export const {writeData} = widgetsSlice.actions
export default widgetsSlice.reducer
