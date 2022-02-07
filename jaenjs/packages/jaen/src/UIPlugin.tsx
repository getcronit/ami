import {IPlugin, PluginStore} from 'react-pluggable'
import {IAdminRoute} from './ui/AdminPage'

export enum RendererPlacements {
  TOOLBAR = 'toolbar',
  TOOLBAR_MENU = 'toolbar-menu'
}

export enum AdminFunctions {
  getRoutes = 'Admin.getRoutes',
  addRoute = 'Admin.addRoute',
  addToolbarItem = 'Admin.addToolbarItem',
  addToolbarMenuItem = 'Admin.addToolbarMenuItem'
}

class UIPlugin implements IPlugin {
  pluginStore!: PluginStore
  routes: IAdminRoute[] = []

  getPluginName(): string {
    return 'JaenUI@0.0.1'
  }

  getDependencies(): string[] {
    return ['Renderer@1.0.0']
  }

  init(pluginStore: PluginStore): void {
    this.pluginStore = pluginStore
  }

  addRendererFunction(afn: AdminFunctions, placement: RendererPlacements) {
    this.pluginStore.addFunction(afn, (item: JSX.Element) => {
      this.pluginStore.executeFunction('Renderer.add', placement, () => item)
    })
  }

  activate(): void {
    this.pluginStore.addFunction(
      AdminFunctions.addRoute,
      (route: IAdminRoute) => {
        this.routes.push(route)
      }
    )

    this.pluginStore.addFunction(AdminFunctions.getRoutes, () => {
      return this.routes
    })
  }

  deactivate(): void {
    this.pluginStore.removeFunction(AdminFunctions.addRoute)
    this.pluginStore.removeFunction(AdminFunctions.getRoutes)
  }
}

export default UIPlugin
