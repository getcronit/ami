import loadable from '@loadable/component'
import AdminPageLoading from './components/AdminPageLoading'

const AdminPageShell = loadable(() => import('./AdminPage'), {
  fallback: <AdminPageLoading heading="Welcome to Jaen Admin" />
})

export default AdminPageShell
