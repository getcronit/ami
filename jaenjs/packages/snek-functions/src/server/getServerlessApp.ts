import {AppOptions, getApp} from './app.js'

import ServerlessHttp from 'serverless-http'
import {buildFolder} from './fileBuilder.js'

const IS_OFFLINE = process.env.IS_OFFLINE

export const getServerlessApp = (options: AppOptions) => async (
  event: Object,
  context: Object
) => {
  if (typeof window !== 'undefined') {
    return null
  }

  const dstPath = `${options.functions}/dist`

  if (IS_OFFLINE) {
    const functionsPath = options.functions

    await buildFolder(functionsPath, dstPath)
  }

  options.functions = dstPath

  return await ServerlessHttp(await getApp(options))(event, context)
}

export default getServerlessApp
