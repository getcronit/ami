import {IAuth} from '@jaen/types'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import * as snekApi from '@jaen/services/api'
import {IAuthLoginPayload} from '@jaen/services/api/types'

export const authInitialState: IAuth = {
  isAuthenticated: false,
  user: null
}

export const login = createAsyncThunk<void, IAuthLoginPayload>(
  'auth/login',
  async (args, thunkAPI) => {
    const response = await snekApi.login(args)

    await thunkAPI.dispatch(fetchMe())
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const response = await snekApi.logout()
})

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, thunkAPI) => {
  const response = await snekApi.getMe()
  return {
    ...response
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true
    })
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false
      state.user = null
    })
  }
})

export const {} = authSlice.actions
export default authSlice.reducer
