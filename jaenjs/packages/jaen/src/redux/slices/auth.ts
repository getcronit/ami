import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {IAuth} from '../../types'

import {IAuthLoginPayload, snekApi} from '@snek-at/snek-api-client'

export const authInitialState: IAuth = {
  isAuthenticated: false,
  user: null
}

export const login = createAsyncThunk<void, IAuthLoginPayload>(
  'auth/login',
  async (args, thunkAPI) => {
    await snekApi.login(args)

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
  reducers: {
    demoLogin: (state, action) => {
      state.isAuthenticated = true
      state.user = {
        isDemo: true,
        email: 'snekman@snek.at',
        full_name: 'Snekman',
        image_url: 'http://www.gravatar.com/avatar'
      }
    },
    demoLogout: (state, action) => {
      state.isAuthenticated = false
      state.user = null
    }
  },
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

export const {demoLogin, demoLogout} = authSlice.actions
export default authSlice.reducer
