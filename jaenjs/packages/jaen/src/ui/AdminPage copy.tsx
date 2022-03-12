import {createHistory, HistorySource} from '@reach/router'
import createHashSource from 'hash-source'
import {
  AdminPageShell as APSComponent,
  SidebarItem
} from './components/AdminPageShell'

import {BsHouse} from '@react-icons/all-files/bs/BsHouse'
import {FaPager} from '@react-icons/all-files/fa/FaPager'
import {BsFiles} from '@react-icons/all-files/bs/BsFiles'
import {BiNotification} from '@react-icons/all-files/bi/BiNotification'

import {RouteComponentProps, useNavigate} from '@reach/router'
import React from 'react'
import AdminToolbar from './AdminToolbar'
import {PagesContainer} from '../internal-plugins/pages/ui/tabs/Pages'
import {FilesContainer} from '../internal-plugins/pages/ui/tabs/Files'
import {NotifyTab} from '../internal-plugins/notify/ui/components/tabs/Notify'
import AdminLogin from './components/AdminLogin'
import {AdminLoginPage} from './AdminLoginPage'
import {useAppSelector, withRedux} from '../redux'
import {SettingsContainer} from './SettingsTab'

let source = createHashSource()
let history = createHistory(source as HistorySource)

export interface IAdminRoute extends SidebarItem {
  group?: string
  content: JSX.Element
}

const buildSidebarItems = (routes: Array<IAdminRoute>) => {
  const grouped: {
    [group: string]: {label: string; items: Array<SidebarItem>}
  } = {}
  const ungrouped: Array<SidebarItem> = []

  for (const route of routes) {
    if (route.group) {
      if (!grouped[route.group]) {
        grouped[route.group] = {
          label: route.group,
          items: []
        }
      }

      grouped[route.group].items.push(route)
    } else {
      ungrouped.push(route)
    }
  }

  return {
    grouped,
    ungrouped
  }
}

const AdminPageShell = (props: RouteComponentProps) => {
  const navigate = useNavigate()

  const windowPathname =
    typeof window !== 'undefined' ? window.location.hash : ''

  const routes = {
    '/': <>Dashboard</>,
    '/pages': <PagesContainer />,
    '/files': <FilesContainer />,
    '/notifications': <NotifyTab />,
    '/settings': <SettingsContainer />
  }
  //const routes: IAdminRoute[] =
  //pluginStore.executeFunction(AdminFunctions.getRoutes) || []
  //const sidebarItems = React.useMemo(() => buildSidebarItems(routes), [routes])

  const activeRoute = React.useMemo(() => {
    let pathname = windowPathname.split('#')[1]

    // prepend slash if needed
    if (pathname?.charAt(0) !== '/') {
      pathname = `/${pathname}`
    }

    for (const [path, content] of Object.entries(routes)) {
      if (path === pathname) {
        return {path, content}
      }
    }

    const routeZero = Object.entries(routes)[0]

    if (routeZero) {
      return {path: routeZero[0], content: routeZero[1]}
    }

    throw new Error('No routes found')
  }, [windowPathname])

  const handleSidebarItemClick = React.useCallback(
    (path: string) => navigate(path),
    [navigate]
  )

  return (
    <APSComponent
      toolbar={<AdminToolbar />}
      sidebarItems={{
        activePath: activeRoute.path,
        ungrouped: [
          {
            path: '/',
            icon: <BsHouse />,
            label: 'Home'
          }
        ],
        grouped: {
          site: {
            label: 'Your Site',
            items: [
              {
                path: '/pages',
                icon: <FaPager />,
                label: 'Pages'
              },
              {
                path: '/files',
                icon: <BsFiles />,
                label: 'Files'
              },
              {
                path: '/notifications',
                icon: <BiNotification />,
                label: 'Notifications'
              }
            ]
          }
        }
      }}
      content={activeRoute.content}
      onSidebarItemClick={handleSidebarItemClick}
      onSettingsClick={() => navigate('/settings')}
      onHelpClick={() => {}}
    />
  )
}

const AdminPage = withRedux((props: any) => {
  return <>nothing</>
})

export default AdminPage
