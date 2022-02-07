import fs from 'fs'
import {downloadMigrationURL, JAEN_STATIC_DATA_DIR} from '.'
import NotifyMigrationPlugin from '../../internal-plugins/notify/NotifyMigrationPlugin'
import PagesMigrationPlugin from '../../internal-plugins/pages/PagesMigrationPlugin'
import * as internalJaenData from '../jaen-data/internal'

import deepmerge from 'deepmerge'

export const migrationPlugins = [
  new PagesMigrationPlugin(),
  new NotifyMigrationPlugin()
]

export const runMigration = async (migrationUrl: string) => {
  if (!fs.existsSync(JAEN_STATIC_DATA_DIR)) {
    throw new Error('JAEN_STATIC_DATA_DIR does not exist')
  }

  if (migrationUrl) {
    const migrationData = await downloadMigrationURL(migrationUrl)

    await Promise.all(
      Object.entries(migrationData).map(async ([pluginName, entity]) => {
        if (pluginName === 'jaen') {
          const data = internalJaenData.readFile()
          const merged = deepmerge(data, entity, {
            arrayMerge: (destinationArray, sourceArray) => sourceArray
          })

          merged.migrationHistory.push({
            createdAt: new Date().toISOString(),
            fileUrl: migrationUrl
          })

          internalJaenData.writeFile(merged)

          return
        }

        const plugin = migrationPlugins.find(
          p => p.getPluginName() === pluginName
        )

        if (plugin) {
          const filePath = `${JAEN_STATIC_DATA_DIR}/${pluginName}.json`

          let baseEntity

          try {
            if (!fs.existsSync(filePath)) {
              fs.writeFileSync(filePath, '{}')
            }

            baseEntity = JSON.parse(fs.readFileSync(filePath, 'utf8'))
          } catch (e) {
            console.warn('Base entity not found for plugin', pluginName)
            console.warn('Creating new base entity')

            fs.writeFileSync(filePath, JSON.stringify({}))
          }

          const newBaseEntityContext = await plugin.migrate(baseEntity, entity)

          fs.writeFileSync(
            filePath,
            JSON.stringify(newBaseEntityContext, null, 2)
          )
        }
      })
    )
  }
}
