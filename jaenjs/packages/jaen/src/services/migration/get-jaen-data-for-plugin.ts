import fs from 'fs'

const JAEN_STATIC_DATA_DIR = './jaen-data'

export async function getJaenDataForPlugin<T>(pluginName: string): Promise<T> {
  const filePath = `${JAEN_STATIC_DATA_DIR}/${pluginName}.json`

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{}')
  }

  const baseEntity = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  return baseEntity
}
