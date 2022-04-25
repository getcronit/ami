import * as jaen from '../redux'
import * as jaenPages from '../internal-plugins/pages/internal/redux'
import * as jaenNotify from '../internal-plugins/notify/redux'
import {Backend} from '../withSnekFinder'

export const resetState = () => {
  if (typeof window !== 'undefined') {
    jaen.resetState()
    jaenPages.resetState()
    jaenNotify.resetState()
    Backend.resetIndex()

    localStorage.removeItem(jaen.persistKey)
    localStorage.removeItem(jaenPages.persistKey)
    localStorage.removeItem(jaenNotify.persistKey)
    localStorage.removeItem(Backend.indexKey)

    window.location.reload()
  }
}
