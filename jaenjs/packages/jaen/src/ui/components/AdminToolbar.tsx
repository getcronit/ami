import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon
} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text
} from '@chakra-ui/react'
import {navigate} from 'gatsby'
import {JaenLogo} from './icons'
export interface AdminToolbarProps {
  logoText: string
  toolbarItems: {
    left: Array<JSX.Element>
    right: Array<JSX.Element>
  }
}

export const AdminToolbar = ({logoText, toolbarItems}: AdminToolbarProps) => {
  const isOnJaenAdmin =
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/admin')

  return (
    <Box
      zIndex={'banner'}
      w="full"
      bg="gray.900"
      color="white"
      h={'56px'}
      py={{base: 2}}
      px={{base: 4}}>
      <HStack
        align={'center'}
        justifyContent={'space-between'}
        bg="white"
        spacing={{
          base: 2,
          lg: 6
        }}
        borderRadius="lg">
        {/* <Link as={GatsbyLink} to="/admin">
        <Flex w="52" justifyContent="center" alignItems="center">
          <Button
            bg="white"
            as={GatsbyLink}
            to={isOnJaenAdmin ? '/' : '/admin'}
            aria-label="Home"
            leftIcon={<JaenLogo boxSize={6} color="white" />}
            color="black"
            fontWeight={'normal'}>
            {isOnJaenAdmin ? 'Jaen Site' : 'Jaen Admin'}
          </Button>
        </Flex>
      </Link> */}
        <Flex
          as="button"
          minW={{
            base: '44',
            lg: '48'
          }}
          display="flex"
          alignItems="center"
          rounded="lg"
          bg="white"
          color="black"
          px="3"
          py="1"
          fontSize="sm"
          userSelect="none"
          cursor="pointer"
          outline="0"
          transition="all 0.2s"
          _hover={{
            bg: 'gray.200'
          }}
          _active={{bg: 'gray.200'}}
          _focus={{shadow: 'outline'}}
          onClick={() => {
            navigate(isOnJaenAdmin ? '/' : '/admin')
          }}>
          <HStack flex="1" spacing="2">
            {isOnJaenAdmin ? <ChevronLeftIcon /> : <ChevronRightIcon />}

            <JaenLogo boxSize={8} color="white" />

            <Text noOfLines={1} fontWeight="bold" fontFamily={'monospace'}>
              {isOnJaenAdmin ? 'Jaen Site' : 'Jaen Admin'}{' '}
            </Text>
          </HStack>
        </Flex>

        <Flex
          gap={3}
          color="black"
          display={{
            base: 'none',
            md: 'none',
            lg: 'flex'
          }}>
          {/* <Button
            size="sm"
            minW="36"
            onClick={() => {
              navigate(isOnJaenAdmin ? '/' : '/admin')
            }}
            aria-label="Home"
            leftIcon={<JaenLogo boxSize={6} color="white" />}
            color="black"
            variant="outline">
            {isOnJaenAdmin ? 'Jaen Site' : 'Jaen Admin'}
          </Button> */}

          {toolbarItems.left.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Flex>

        <Flex
          justifyContent={'center'}
          flex="1"
          color="black"
          display={{
            base: 'flex',

            lg: 'none'
          }}>
          <Menu isLazy>
            <MenuButton
              as={Button}
              maxW="56"
              w="100%"
              // leftIcon={}
              variant="outline"
              fontWeight="normal">
              <HStack justifyContent={'center'}>
                <HamburgerIcon />

                <Text>Actions</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              {toolbarItems.left.map((item, index) => (
                <MenuItem key={index}>{item}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        <Spacer
          display={{
            base: 'none',
            lg: 'flex'
          }}
        />
        <HStack gap={5} color="black">
          {toolbarItems.right.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </HStack>
      </HStack>
    </Box>
  )
}
