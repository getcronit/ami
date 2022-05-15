import {useAppSelector, withRedux} from '../redux'
import {
  createHistory,
  HistorySource,
  LocationProvider,
  Redirect,
  Router,
  useLocation,
  RouteComponentProps,
  useNavigate
} from '@reach/router'
import createHashSource from 'hash-source'
import {
  AdminPageShell as APSComponent,
  SidebarItem
} from './components/AdminPageShell'
import loadable from '@loadable/component'
import React from 'react'
import AdminToolbarContainer from './AdminToolbar'
import {BsHouse} from '@react-icons/all-files/bs/BsHouse'
import {FaPager} from '@react-icons/all-files/fa/FaPager'
import {BsFiles} from '@react-icons/all-files/bs/BsFiles'
import {BiNotification} from '@react-icons/all-files/bi/BiNotification'
import {AdminLoginPage} from './LoginPage'

import PagesTab from '../internal-plugins/pages/ui/tabs/Pages'
import FilesTab from '../internal-plugins/pages/ui/tabs/Files'
import NotifyTab from '../internal-plugins/notify/ui/components/tabs/Notify'
import Dashboard from './DashboardTab'
import SettingsTab from './SettingsTab'
import {BiUser} from '@react-icons/all-files/bi/BiUser'
import {useViews} from '../internal-plugins/views/services/view'

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

const AdminPageShell = () => {
  const navigate = useNavigate()

  const windowPathname =
    typeof window !== 'undefined' ? window.location.hash : ''

  // set window title
  React.useEffect(() => {
    document.title = 'Jaen Admin'
  }, [])

  const views = useViews()

  const routes: {[path: string]: JSX.Element} = {
    '/': <Dashboard />,
    '/pages': <PagesTab />,
    '/files': <FilesTab />,
    '/notifications': <NotifyTab />,
    '/settings': <SettingsTab />
  }

  for (const View of views) {
    routes['/views' + View.options.path] = <View />
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

  const handleHelpClick = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open('https://snek.at/docs/jaen/jaen-admin', '_blank')
    }
  }, [])

  return (
    <APSComponent
      toolbar={<AdminToolbarContainer />}
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
          },
          views: {
            label: 'Views',
            items: [
              {
                path: '/views/users',
                icon: <BiUser />,
                label: 'Users'
              }
            ]
          }
        }
      }}
      content={activeRoute.content}
      onSidebarItemClick={handleSidebarItemClick}
      onSettingsClick={() => navigate('/settings')}
      onHelpClick={handleHelpClick}
    />
  )
}

export default AdminPageShell
