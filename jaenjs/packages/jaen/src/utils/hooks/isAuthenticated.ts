import {store} from '../../redux/index'

export const isAuthenticated = () => {
  const state = store.getState()

  return state.auth.isAuthenticated
}
