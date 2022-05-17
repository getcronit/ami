import {useAppSelector, withRedux} from '../redux'

import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate
} from 'react-router-dom'

import loadable from '@loadable/component'
import AdminPageLoading from './components/AdminPageLoading'
import AdminToolbarContainer from './AdminToolbar'
import PagesTab from '../internal-plugins/pages/ui/tabs/Pages'
import FilesTab from '../internal-plugins/pages/ui/tabs/Files'
import NotifyTab from '../internal-plugins/notify/ui/components/tabs/Notify'
import DashboardTab from './DashboardTab'
import SettingsTab from './SettingsTab'
import {useViews, withBaseView} from '../internal-plugins/views/services/view'
import React from 'react'
import {UIProps} from './components/AdminPageShell'
import {Circle} from '@chakra-ui/react'

import {BsHouse} from '@react-icons/all-files/bs/BsHouse'
import {FaPager} from '@react-icons/all-files/fa/FaPager'
import {BsFiles} from '@react-icons/all-files/bs/BsFiles'
import {BiNotification} from '@react-icons/all-files/bi/BiNotification'
import {navigate} from 'gatsby'

const buildViews = (
  views: Array<{
    path: string
    Component: React.ComponentType<{}>
    label: string
    group?: string
    Icon?: React.ComponentType<{}>
    hasRoutes?: boolean
  }>
) => {
  const routes: Array<{
    path: string
    Component: React.ComponentType<{}>
    hasRoutes?: boolean
  }> = []
  const sidebarItems: Omit<UIProps['sidebarItems'], 'activePath'> = {
    ungrouped: [],
    grouped: {}
  }

  for (const view of views) {
    routes.push({
      path: view.path,
      Component: view.Component,
      hasRoutes: !!view.hasRoutes
    })

    const item = {
      path: view.path,
      label: view.label,
      icon: view.Icon ? <view.Icon /> : <Circle bg="teal" />
    }

    if (!view.group) {
      sidebarItems.ungrouped.push(item)
    } else {
      if (!sidebarItems.grouped[view.group]) {
        sidebarItems.grouped[view.group] = {
          label: view.group,
          items: []
        }
      }

      sidebarItems.grouped[view.group].items.push(item)
    }
  }

  return {routes, sidebarItems}
}

const AdminPageShell = loadable(() => import('./components/AdminPageShell'), {
  fallback: <AdminPageLoading heading="Welcome to Jaen Admin" />
})

const AdminPage = withRedux(() => {
  if (typeof window === 'undefined') {
    return null
  }

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [isAuthenticated])

  const {routes, sidebarItems} = buildViews([
    {
      path: '/',
      Component: DashboardTab,
      label: 'Dashboard',
      Icon: BsHouse
    },
    {
      path: '/pages',
      Component: PagesTab,
      label: 'Pages',
      Icon: FaPager,
      group: 'Your Site'
    },
    {
      path: '/files',
      Component: FilesTab,
      label: 'Files',
      Icon: BsFiles,
      group: 'Your Site'
    },
    {
      path: '/notifications',
      Component: NotifyTab,
      label: 'Notifications',
      Icon: BiNotification,
      group: 'Your Site'
    },

    ...useViews().map(View => ({
      path: '/views' + View.options.path,
      Component: withBaseView(View),
      label: View.options.displayName,
      group: 'Views',
      Icon: View.options.Icon,
      hasRoutes: true // assume that the view uses the <Routes> component to render its routes
    }))
  ])

  const routerNavigate = useNavigate()

  const onSidebarItemClick = React.useCallback((path: string) => {
    routerNavigate(path)
  }, [])

  if (!isAuthenticated) {
    return <AdminPageLoading heading="Redirecting" />
  }

  return (
    <Routes>
      <Route
        element={
          <AdminPageShell
            toolbar={<AdminToolbarContainer />}
            sidebarItems={{
              activePath: window.location.hash.replace('#', ''),
              ...sidebarItems
            }}
            onSidebarItemClick={onSidebarItemClick}
            onSettingsClick={() => routerNavigate('/settings')}
            onHelpClick={() => {}}>
            <Outlet />
          </AdminPageShell>
        }>
        <Route path="/settings" element={<SettingsTab />} />
        {routes.map(route => {
          let {path, Component, hasRoutes} = route

          if (hasRoutes) {
            path = `${path}/*`
          }

          return <Route key={path} path={path} element={<Component />} />
        })}

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    </Routes>
  )
})

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login',
  children
}: {
  isAllowed: boolean
  redirectPath?: string
  children?: JSX.Element
}): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default () => (
  <HashRouter>
    <AdminPage />
  </HashRouter>
)
