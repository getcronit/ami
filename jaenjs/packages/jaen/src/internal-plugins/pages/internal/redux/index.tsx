/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {useDeepEqualSelector} from '@jaen/utils/hooks/useDeepEqualSelector'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {graphql, useStaticQuery} from 'gatsby'
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore
} from 'react-redux'
import {clearState, loadState, persistKey, saveState} from './persist-state'
import internal, {initialState} from './slices/internal'

const combinedReducer = combineReducers({
  internal
})

// Reset state if action called
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STATE') {
    return {
      internal: initialState
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

store.subscribe(() => {
  saveState(store.getState() as RootState)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDeepEqualSelector =
  useDeepEqualSelector as TypedUseSelectorHook<RootState>
export const useAppState = () => useStore().getState() as RootState

export const withRedux =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  props => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    )
  }

/**
 * Persist state to localStorage
 * Notice that this can only be used in the browser, so we can't use it in
 * `gatsby-ssr.js` because it would have unwanted side effects.
 */
export const PersistorWrapper: React.FC = ({children}) => {
  const btKey = `${persistKey}:buildTime`
  const data = useStaticQuery<{
    siteBuildMetadata: {buildTime: string}
  }>(graphql`
    query PagesBuildMetadata {
      siteBuildMetadata {
        buildTime
      }
    }
  `)

  const buildTime = data.siteBuildMetadata.buildTime

  const storageBuildTime = localStorage.getItem(btKey)

  if (storageBuildTime !== buildTime) {
    if (storageBuildTime) {
      clearState()
    }

    localStorage.setItem(btKey, buildTime)
  }

  return <>{children}</>
}
