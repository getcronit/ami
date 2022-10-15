import AdminLogin from './components/AdminLogin'
import {useAppDispatch, useAppSelector, withRedux} from '../redux'
import {login, demoLogin} from '../redux/slices/auth'
import {navigate, PageProps} from 'gatsby'
import React from 'react'
import {SEO} from '../internal-plugins/pages'
import {GlobalStyle, LightMode} from '@chakra-ui/react'

export const AdminLoginPage = withRedux((props: PageProps) => {
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
      window.open('https://github.com/snek-at/jaen', '_blank')?.focus()
    }
  }

  return (
    <LightMode>
      <GlobalStyle />
      <SEO
        pagePath={props.path}
        pageMeta={{
          title: 'Jaen Admin | Login'
        }}
      />
      <AdminLogin
        onLogin={handleLogin}
        onLiveDemo={handleLiveDemo}
        onHomeClick={handleHomeClick}
        onDocsClick={handleDocsClick}
      />
    </LightMode>
  )
})

export default AdminLoginPage
