import {IJaenPlugin} from '../../plugins'
import {updateEntity} from '../../services/migration'
import {runPublish} from './internal/services/publish'
import {IPagesMigration, IPagesMigrationBase} from './types'

export default class PagesMigrationPlugin implements IJaenPlugin {
  getPluginName(): string {
    return 'JaenPages@0.0.1'
  }
  async migrate(base: IPagesMigrationBase, migration: IPagesMigration) {
    for (const id of Object.keys(migration.pages)) {
      base[id] = await updateEntity(base[id], migration.pages[id])
    }

    return base
  }

  async publishData() {
    return await runPublish()
  }
}
