import {PageProps} from 'gatsby'
import React from 'react'
import AdminPageLoading from './components/AdminPageLoading'

const AdminPageShell = React.lazy(() => import('./AdminPage'))

const LoadingAdminPage = (props: PageProps) => {
  return (
    <React.Suspense
      fallback={<AdminPageLoading heading="Welcome to Jaen Admin" />}>
      <AdminPageShell {...props} />
    </React.Suspense>
  )
}

export default LoadingAdminPage
