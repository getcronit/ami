// pages
// snekfinder root url
import {store} from '../../redux'
import {Backend} from '../../withSnekFinder'
import {useSnekFinderContext} from '@jaenjs/snek-finder'
import {DeepPartial} from 'redux'
import {ISite} from '../../types'

type DataType = {
  site?: DeepPartial<ISite>
  finderUrl?: string
}

const getSiteData = (): DataType['site'] | undefined => {
  const state = store.getState()

  if (state.site) {
    return state.site
  }
}

const getFinderUrl = async (): Promise<string> => {
  return await Backend.uploadIndex()
}

export const runPublish = async () => {
  const data: DataType = {
    site: getSiteData(),
    finderUrl: await getFinderUrl()
  }

  return data
}
