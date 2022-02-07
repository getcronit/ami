import {createPluginStore, RendererPlugin} from 'react-pluggable'
import UIPlugin from './UIPlugin'
import NotifyPlugin from './internal-plugins/notify/NotifyPlugin'
import PagesPlugin from './internal-plugins/pages/PagesPlugin'

export const pluginStore = createPluginStore()

export interface IJaenPlugin {
  getPluginName(): string
  /**
   * Defines how the plugin handles a migration.
   *
   * @param base - old data
   * @param migration - new migration
   */
  migrate(base: any | undefined, migration: any): any

  /**
   * Defines how the plugin reacts to a publish event.
   */
  publishData(): Promise<any>
}

export const plugins = [new UIPlugin(), new PagesPlugin(), new NotifyPlugin()]

const installPlugins = () => {
  pluginStore.install(new RendererPlugin())

  if (typeof window !== 'undefined') {
    for (const plugin of plugins) {
      pluginStore.install(plugin)
    }
  }
}

installPlugins()
