import AdminLogin from './components/AdminLogin'
import {useAppDispatch, useAppSelector, withRedux} from '../redux'
import {login, demoLogin} from '../redux/slices/auth'
import {navigate} from 'gatsby'
import React from 'react'

export const AdminLoginPage = withRedux(() => {
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin')
    }
  }, [isAuthenticated])

  const handleLogin = (email: string, password: string) => {
    dispatch(
      login({
        email,
        password
      })
    )
  }

  const handleLiveDemo = () => {
    dispatch(demoLogin({}))
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleDocsClick = () => {
    if (typeof window !== 'undefined') {
      window.open('https://snek.at/products/jaen', '_blank')?.focus()
    }
  }

  return (
    <AdminLogin
      onLogin={handleLogin}
      onLiveDemo={handleLiveDemo}
      onHomeClick={handleHomeClick}
      onDocsClick={handleDocsClick}
    />
  )
})

export default AdminLoginPage
