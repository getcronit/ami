import {DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {
  Flex,
  Text,
  Spacer,
  Box,
  Button,
  Badge,
  Divider,
  Portal
} from '@chakra-ui/react'
import {Link} from 'gatsby'
import {FaRocket} from 'react-icons/fa'
import {JaenLogo} from './icons'

export interface AdminToolbarProps {
  logoText: string
  toolbarItems: {
    left: Array<JSX.Element>
    right: Array<JSX.Element>
  }
}

export const AdminToolbar = ({logoText, toolbarItems}: AdminToolbarProps) => {
  return (
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
      <Flex gap={3} bg="white" borderRadius="lg" p="1" color="black">
        {toolbarItems.left}
      </Flex>
      <Spacer />
      <Flex gap={5}>{toolbarItems.right}</Flex>
    </Flex>
  )
}