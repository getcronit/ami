import {SearchProvider, useProductSearch} from '@snek-at/gatsby-theme-shopify'
import React from 'react'
import {useFlatMenu} from '../../../hooks/menu'
import {Header} from './Header'

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

  return (
    <Header
      links={menu}
      path={path}
      onSearch={setSearchTerm}
      searchResultProducts={searched.products}
    />
  )
}

export default function HeaderWithSearch({path}: HeaderContainerProps) {
  return (
    <SearchProvider>
      <HeaderContainer path={path} />
    </SearchProvider>
  )
}
