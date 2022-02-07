import {Box} from '@chakra-ui/react'
import {PersistorWrapper} from '@jaen/redux'
import AdminToolbarContainer from '@jaen/ui/AdminToolbar'
import {GatsbyBrowser} from 'gatsby'

export * from './src/gatsby/wrapper'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}) => {
  const pathname = window.location.pathname

  if (pathname.startsWith('/jaen/admin')) {
    return <PersistorWrapper>{element}</PersistorWrapper>
  }

  return (
    <>
      <PersistorWrapper>
        <AdminToolbarContainer sticky />
      </PersistorWrapper>

      {element}
    </>
  )
}
