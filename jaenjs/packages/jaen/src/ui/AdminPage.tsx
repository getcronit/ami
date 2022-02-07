import {useAppSelector, withRedux} from '@jaen/redux'
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
import {AdminLoginPage} from './AdminLoginPage'

const PagesTab = loadable(
  () => import('@jaen/internal-plugins/pages/ui/tabs/Pages'),
  {
    fallback: <div>Loading...</div>
  }
)

const FilesTab = loadable(
  () => import('@jaen/internal-plugins/pages/ui/tabs/Files'),
  {
    fallback: <div>Loading...</div>
  }
)

const NotifyTab = loadable(
  () => import('@jaen/internal-plugins/notify/ui/components/tabs/Notify'),
  {
    fallback: <div>Loading...</div>
  }
)
const SettingsTab = loadable(() => import('./SettingsTab'), {
  fallback: <div>Loading...</div>
})

const Dashboard = loadable(() => import('./DashboardTab'), {
  fallback: <div>Loading...</div>
})

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

  // set window title
  React.useEffect(() => {
    document.title = 'Jaen Admin'
  }, [])

  const routes = {
    '/': <Dashboard />,
    '/pages': <PagesTab />,
    '/files': <FilesTab />,
    '/notifications': <NotifyTab />,
    '/settings': <SettingsTab />
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

const AdminPage = withRedux((props: any) => {
  if (typeof window === 'undefined') {
    return null
  }

  const source = createHashSource()
  const history = createHistory(source as HistorySource)

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  return (
    <LocationProvider history={history}>
      <Router primary={false}>
        {isAuthenticated ? (
          <AdminPageShell default path="/" />
        ) : (
          <AdminLoginPage default path="/login" />
        )}
      </Router>
    </LocationProvider>
  )
})

export default AdminPage
