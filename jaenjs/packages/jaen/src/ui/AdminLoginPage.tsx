import AdminLogin from './components/AdminLogin'
import {RouteComponentProps} from '@reach/router'
import {useAppDispatch} from '@jaen/redux'
import {login} from '@jaen/redux/slices/auth'
import {navigate} from 'gatsby'

export const AdminLoginPage = (props: RouteComponentProps) => {
  const dispatch = useAppDispatch()

  const handleLogin = (email: string, password: string) => {
    dispatch(
      login({
        email,
        password
      })
    )
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
      onLiveDemo={() => {}}
      onHomeClick={handleHomeClick}
      onDocsClick={handleDocsClick}
    />
  )
}
