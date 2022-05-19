import {SearchProvider, useProductSearch} from '@snek-at/gatsby-theme-shopify'
import React from 'react'
import {useFlatMenu} from '../../../hooks/menu'
import {Header} from './Header'
import {AuthModal} from '../AuthModal'
import {useDisclosure} from '@chakra-ui/react'
import usersAuth from '../../../snek-functions/usersAuth'

const useAuth = () => {
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

export interface HeaderContainerProps {
  path: string
}

export const HeaderContainer = ({path}: HeaderContainerProps) => {
  const menu = useFlatMenu()

  const [searchTerm, setSearchTerm] =
    React.useState<string | undefined>(undefined)

  const searched = useProductSearch({
    count: 15,
    filters: {
      searchTerm
    }
  })

  const authDisclosure = useDisclosure()

  const {user, onLogin, onLogout} = useAuth()

  console.log('user', user)

  return (
    <>
      <AuthModal
        onLogin={onLogin}
        isOpen={authDisclosure.isOpen}
        onClose={authDisclosure.onClose}
        user={user || undefined}
        onLogout={onLogout}
      />
      <Header
        links={menu}
        path={path}
        onSearch={setSearchTerm}
        searchResultProducts={searched.products}
        auth={{
          isLoggedIn: !!user,
          onUserClick: authDisclosure.onOpen,
          onLoginClick: authDisclosure.onOpen,
          user: user || undefined
        }}
      />
    </>
  )
}

export const HeaderWithSearch = ({path}: HeaderContainerProps) => {
  return (
    <SearchProvider>
      <HeaderContainer path={path} />
    </SearchProvider>
  )
}
