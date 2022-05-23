import {Store} from 'redux'
import {onErrorResetAndRery} from './middleware'

export default <RootState extends {}>(persistKey: string) => {
  const loadState = (): RootState | undefined => {
    try {
      const serialState = localStorage.getItem(persistKey)

      if (serialState === null) {
        return undefined
      }
      return JSON.parse(serialState) as RootState
    } catch (err) {
      return undefined
    }
  }

  const saveState = (state: RootState) => {
    try {
      const serialState = JSON.stringify(state)
      localStorage.setItem(persistKey, serialState)
    } catch (err) {
      console.log(err)
    }
  }

  const persistState = (store: Store) => {
    store.subscribe(() => {
      saveState(store.getState() as RootState)
    })

    const resetState = () => {
      localStorage.removeItem(persistKey)

      store.dispatch({
        type: 'RESET_STATE'
      })
    }

    return {resetState}
  }

  const persistMiddleware = [onErrorResetAndRery<RootState>(persistKey)]

  return {
    loadState,
    saveState,
    persistState,
    persistMiddleware
  }
}
