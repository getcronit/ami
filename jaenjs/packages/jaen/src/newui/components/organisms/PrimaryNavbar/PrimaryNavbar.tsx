import {ChevronDownIcon, ChevronUpIcon} from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Spacer,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import {JaenLogo} from '../../atoms'

export interface PrimaryNavbarProps {
  user?: {
    fullname: string
    email: string
    avatar?: string
  }
  userMenuItems?: Array<JSX.Element>
}

const PrimaryNavbar: React.FC<PrimaryNavbarProps> = ({
  user,
  userMenuItems = []
}) => {
  return (
    <Flex bg="darkbg" h="52px" px="2" align="center">
      <HStack>
        <JaenLogo boxSize="8" />
        <Box>
          <Text fontSize="lg" fontWeight={'thin'} color={'white'}>
            Jaen
          </Text>
        </Box>
      </HStack>
      <Spacer />
      <Box>
        {user && <UserDropdown user={user} userMenuItems={userMenuItems} />}
      </Box>
    </Flex>
  )
}

export default PrimaryNavbar

const UserDropdown = (props: {
  user: {fullname: string; email: string; avatar?: string | undefined}
  userMenuItems: JSX.Element[]
}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <Menu isOpen={isOpen}>
      {({isOpen}) => (
        <>
          <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
            <HStack spacing="1">
              <Avatar size="sm" name={props.user.fullname} bg="secondary" />
              <Box color="white">
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Box>
            </HStack>
          </MenuButton>
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            <Text fontWeight="medium" m="2">
              {props.user.email}
            </Text>
            <MenuDivider />
            {props.userMenuItems}
          </MenuList>
        </>
      )}
    </Menu>
  )
}
