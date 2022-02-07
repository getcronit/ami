import {IStatus} from '@jaen/types'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const statusInitialState: IStatus = {
  isPublishing: false
}

const statusSlice = createSlice({
  name: 'status',
  initialState: statusInitialState,
  reducers: {
    setPublishing: (state, action: PayloadAction<boolean>) => {
      state.isPublishing = action.payload
    }
  }
})

export const {setPublishing} = statusSlice.actions
export default statusSlice.reducer
