import {IJaenPlugin} from '../../plugins'
import {updateEntity} from '../../services/migration'
import {runPublish} from './services/publish'
import {INotificationsMigration, INotificationsMigrationBase} from './types'

export default class NotifyMigrationPlugin implements IJaenPlugin {
  static pluginName = 'JaenNotify@0.0.1'
  getPluginName(): string {
    return NotifyMigrationPlugin.pluginName
  }
  async migrate(
    base: INotificationsMigrationBase,
    migration: INotificationsMigration
  ) {
    for (const id of Object.keys(migration.notifications)) {
      base[id] = await updateEntity(base[id], migration.notifications[id])
    }

    return base
  }

  async publishData() {
    return await runPublish()
  }
}
