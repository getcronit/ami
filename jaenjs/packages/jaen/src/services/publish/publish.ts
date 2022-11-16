// pages
// snekfinder root url
import {DeepPartial} from 'redux'
import {store} from '../../redux'
import {ISite} from '../../types'
import {Backend} from '../../withSnekFinder'

type DataType = {
  site?: DeepPartial<ISite>
  finderUrl?: string
}

const getStoreData = () => {
  const state = store.getState()

  return {
    site: state.site,
    widgets: state.widgets
  }
}

const getFinderUrl = async (): Promise<string> => {
  return await Backend.uploadIndex()
}

export const runPublish = async () => {
  const data: DataType = {
    ...getStoreData(),
    finderUrl: await getFinderUrl()
  }

  return data
}
