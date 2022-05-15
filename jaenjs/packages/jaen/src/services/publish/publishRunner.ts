import {upload} from '../openStorageGateway'
import * as snekApi from '../api'
import {runPublish} from './publish'
import {migrationPlugins} from '../migration/plugins'

const runPluginsToGetMergedData = async () => {
  const data: any = {}
  for (const plugin of migrationPlugins) {
    const pluginData = await plugin.publishData()
    data[plugin.getPluginName()] = pluginData
  }

  // run internal jaen plugin
  data['jaen'] = await runPublish()

  return data
}

export const publishRunner = async () => {
  const data = await runPluginsToGetMergedData()
  const fileUrl = await upload(data)
  //@ts-ignore
  const jaenProjectId: number = ___JAEN_PROJECT_ID___

  try {
    await snekApi.publishProject(jaenProjectId, fileUrl)
    return true
  } catch (e) {
    return false
  }
}
