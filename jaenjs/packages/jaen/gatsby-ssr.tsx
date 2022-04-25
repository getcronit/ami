import AdminToolbarContainer from './src/ui/AdminToolbar'
import {GatsbySSR} from 'gatsby'
import {Flex, Box} from '@chakra-ui/react'
import {IncomingBuildCheckerProvider} from './src/services/IncomingBuildChecker'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <IncomingBuildCheckerProvider>{element}</IncomingBuildCheckerProvider>
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({element}) => {
  return (
    <Flex direction={'column'}>
      <Box pos="sticky" top="0" zIndex={'banner'}>
        <AdminToolbarContainer />
      </Box>

      <Box>{element}</Box>
    </Flex>
  )
}
