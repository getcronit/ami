import {Flex, Link, Spacer, Text} from '@chakra-ui/react'
import {Link as GatsbyLink} from 'gatsby'
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
      <Link as={GatsbyLink} to="/admin">
        <Flex w="52" justifyContent="center" alignItems="center">
          <JaenLogo w="32px" h="32px" me="10px" color="white" />
          <Text fontSize="sm" mt="3px" fontWeight="bold">
            {logoText}
          </Text>
        </Flex>
      </Link>
      <Flex gap={3} bg="white" borderRadius="lg" p="1" color="black">
        {toolbarItems.left.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Flex>
      <Spacer />
      <Flex gap={5}>
        {toolbarItems.right.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Flex>
    </Flex>
  )
}
