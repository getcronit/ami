import {PageProps} from 'gatsby'
import React from 'react'
import AdminPageLoading from './components/AdminPageLoading'

const AdminPageShell = React.lazy(() => import('./AdminPage'))

const LoadingAdminPage = (props: PageProps) => {
  const isSSR = typeof window === 'undefined'

  return (
    <React.Suspense
      fallback={<AdminPageLoading heading="Welcome to Jaen Admin" />}>
      {!isSSR && <AdminPageShell {...props} />}
    </React.Suspense>
  )
}

export default LoadingAdminPage
