/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {useDeepEqualSelector} from '../utils/hooks/useDeepEqualSelector'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore
} from 'react-redux'
import PersistState from './persist-state'

import auth, {authInitialState} from './slices/auth'
import site, {siteInitialState} from './slices/site'
import status, {statusInitialState} from './slices/status'

export const persistKey = 'jaenjs-state'

const {loadState, persistState} = PersistState<RootState>(persistKey)

const combinedReducer = combineReducers({
  auth,
  site,
  status
})

// Reset state if action called
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STATE') {
    return {
      auth: authInitialState,
      site: siteInitialState,
      status: statusInitialState
    }
  }

  return combinedReducer(state, action)
}

const persistedState = loadState()

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {extraArgument: {}}
    }).concat([]),
  devTools: true || process.env.NODE_ENV !== 'production',
  preloadedState: persistedState
})

export const {resetState} = persistState(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDeepEqualSelector = useDeepEqualSelector as TypedUseSelectorHook<RootState>
export const useAppState = () => useStore().getState() as RootState

export const withRedux = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => props => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )
}
