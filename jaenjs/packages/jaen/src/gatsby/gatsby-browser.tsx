import AdminToolbarContainer from '../ui/AdminToolbar'
import {GatsbyBrowser} from 'gatsby'
import {SnekFinder} from '../withSnekFinder'
import {Flex, Box} from '@chakra-ui/react'
import {IncomingBuildCheckerProvider} from '../services/IncomingBuildChecker'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element
}) => {
  return <IncomingBuildCheckerProvider>{element}</IncomingBuildCheckerProvider>
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}) => {
  const pathname = window.location.pathname

  if (pathname.startsWith('/jaen/admin')) {
    return <SnekFinder>{element}</SnekFinder>
  }

  return (
    <Flex direction={'column'}>
      <Box pos="sticky" top="0" zIndex={'banner'}>
        <AdminToolbarContainer />
      </Box>
      <Box>{element}</Box>
    </Flex>
  )
}
