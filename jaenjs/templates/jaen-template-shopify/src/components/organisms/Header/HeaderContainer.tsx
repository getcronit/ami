import {SearchProvider, useProductSearch} from '@snek-at/gatsby-theme-shopify'
import React from 'react'
import {useFlatMenu} from '../../../hooks/menu'
import {Header} from './Header'
import {AuthModal} from '../AuthModal'
import {useDisclosure} from '@chakra-ui/react'
import {useUserAuth} from '../../../services/useUserAuth'

export interface HeaderContainerProps {
  path: string
}

export const HeaderContainer = ({path}: HeaderContainerProps) => {
  const menu = useFlatMenu()

  const search = useProductSearch({
    options: {
      count: 15
    },
    persistData: false
  })

  const onSearch = (searchTerm: string) => {
    search.onChangeFilter({
      searchTerm
    })
  }

  const authDisclosure = useDisclosure()

  const {user, onLogin, onLogout} = useUserAuth()

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
        onSearch={onSearch}
        searchResultProducts={search.products}
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
