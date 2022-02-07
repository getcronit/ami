import {Flex, Text, Spacer, Box} from '@chakra-ui/react'
import {Link} from 'gatsby'
import {JaenLogo} from './icons'

export interface AdminToolbarProps {
  sticky?: boolean
  logoText: string
  toolbarItems: {
    left: Array<JSX.Element>
    right: Array<JSX.Element>
  }
}

export const AdminToolbar = ({
  logoText,
  toolbarItems,
  sticky = false
}: AdminToolbarProps) => {
  const toolbar = (
    <Flex
      zIndex={'banner'}
      w="full"
      bg="gray.900"
      color="white"
      h={'54px'}
      py={{base: 2}}
      px={{base: 4}}
      align={'center'}>
      <Link to="/jaen/admin">
        <Flex w="48" justifyContent="center" alignItems="center">
          <JaenLogo w="32px" h="32px" me="10px" color="white" />
          <Text fontSize="sm" mt="3px">
            <Text fontWeight="bold">{logoText}</Text>
          </Text>
        </Flex>
      </Link>
      <Flex gap={5} bg="gray.700" borderRadius="lg" p="1">
        {toolbarItems.left}
      </Flex>
      <Spacer />
      <Flex gap={5}>{toolbarItems.right}</Flex>
    </Flex>
  )

  return sticky ? (
    <Box pos="sticky" top="0" zIndex={'banner'}>
      {toolbar}
    </Box>
  ) : (
    toolbar
  )
}
