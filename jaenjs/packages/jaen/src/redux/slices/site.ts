import {ISite} from '@jaen/types'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const siteInitialState: ISite = {
  siteMetadata: {}
}

const siteSlice = createSlice({
  name: 'site',
  initialState: siteInitialState,
  reducers: {
    updateSiteMetadata: (
      state,
      action: PayloadAction<ISite['siteMetadata']>
    ) => {
      state.siteMetadata = {
        ...state.siteMetadata,
        ...action.payload
      }
    }
  }
})

export const {updateSiteMetadata} = siteSlice.actions
export default siteSlice.reducer
