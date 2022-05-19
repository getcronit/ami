import {navigate} from 'gatsby'
import React from 'react'
import usersAuth from '../snek-functions/usersAuth'

export const useUserAuth = () => {
  const [user, setUser] =
    React.useState<{
      id: string
      fullName: string
      email: string
    } | null>(null)

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    setUser(user)
  }, [])

  const onLogin = React.useCallback(
    async (user: {email: string; password: string}) => {
      const auth = await usersAuth({
        email: user.email,
        password: user.password
      })

      if (auth) {
        localStorage.setItem('user', JSON.stringify(auth))
        setUser(auth)

        // simulate soft refresh
        navigate('')
      }

      return !!auth
    },
    []
  )

  const onLogout = React.useCallback(() => {
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return {user, onLogin, onLogout}
}
