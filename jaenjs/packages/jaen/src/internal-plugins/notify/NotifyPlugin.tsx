import {IPlugin, PluginStore} from 'react-pluggable'
import {AdminFunctions} from '../../UIPlugin'
import {NotifyTab} from './ui/components/tabs/Notify'

class NotifyPlugin implements IPlugin {
  pluginStore!: PluginStore

  getPluginName(): string {
    // Do not change this because it is used in the migrations
    // When changing this, the migrations based on this plugin will not be
    // executed anymore.
    return 'JaenNotify@0.0.1'
  }

  getDependencies(): string[] {
    return []
  }

  init(pluginStore: PluginStore): void {
    this.pluginStore = pluginStore
  }

  activate(): void {
    this.pluginStore.executeFunction(AdminFunctions.addRoute, {
      path: '/notifications',
      name: 'Notifications',
      rtlName: 'لوحة القيادة',
      icon: null,
      component: NotifyTab,
      layout: ''
    })
  }

  deactivate(): void {
    //
  }
}

export default NotifyPlugin
