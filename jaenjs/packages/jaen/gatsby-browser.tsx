import {PersistorWrapper} from './src/redux'
import AdminToolbarContainer from './src/ui/AdminToolbar'
import {GatsbyBrowser} from 'gatsby'
import {SnekFinder} from './src/withSnekFinder'
import {Flex, Box} from '@chakra-ui/react'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}) => {
  const pathname = window.location.pathname

  if (pathname.startsWith('/jaen/admin')) {
    return (
      <PersistorWrapper>
        <SnekFinder>{element}</SnekFinder>
      </PersistorWrapper>
    )
  }

  return (
    <PersistorWrapper>
      <Flex direction={'column'}>
        <Box pos="sticky" top="0" zIndex={'banner'}>
          <AdminToolbarContainer />
        </Box>
        <Box>{element}</Box>
      </Flex>
    </PersistorWrapper>
  )
}
