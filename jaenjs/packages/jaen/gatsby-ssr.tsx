import {PersistorWrapper} from './src/redux'
import AdminToolbarContainer from './src/ui/AdminToolbar'
import {GatsbyBrowser} from 'gatsby'
import {Flex, Box} from '@chakra-ui/react'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}) => {
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
