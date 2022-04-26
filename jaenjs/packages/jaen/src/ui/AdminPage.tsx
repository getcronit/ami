import {useAppSelector, withRedux} from '../redux'
import {
  createHistory,
  HistorySource,
  LocationProvider,
  Router
} from '@reach/router'
import createHashSource from 'hash-source'
import loadable from '@loadable/component'
import {AdminLoginPage} from './AdminLoginPage'
import AdminPageLoading from './components/AdminPageLoading'

const AdminPageShell = loadable(() => import('./AdminPageShell'), {
  fallback: <AdminPageLoading />
})

const AdminPage = withRedux(() => {
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
