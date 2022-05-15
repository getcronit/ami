import PagesMigrationPlugin from '../../internal-plugins/pages/PagesMigrationPlugin'
import NotifyMigrationPlugin from '../../internal-plugins/notify/NotifyMigrationPlugin'

export const migrationPlugins = [
  new PagesMigrationPlugin(),
  new NotifyMigrationPlugin()
]
