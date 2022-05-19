import {
  Box,
  Flex,
  IconButton,
  HStack,
  Center,
  Button,
  Collapse,
  VStack,
  Divider,
  useColorModeValue,
  useDisclosure,
  Link,
  Text,
  Stack,
  Icon
} from '@chakra-ui/react'
import {CloseIcon, HamburgerIcon, ChevronDownIcon} from '@chakra-ui/icons'
import {FaShoppingBasket} from '@react-icons/all-files/fa/FaShoppingBasket'
import {FaUser} from '@react-icons/all-files/fa/FaUser'
import {Link as GatsbyLink} from 'gatsby'
import React from 'react'
import {Logo} from '../../../common/assets/Logo'

import * as styles from './styles'
import {Searchbar, SearchbarProps} from '../../molecules/Searchbar'

const findBestMatch = (path: string, paths: Array<string>) => {
  let bestMatch: string | undefined
  let bestMatchScore = 0

  // check how many a path matches the current path
  // if it is the best match, save it
  paths.forEach(pathToMatch => {
    // iterate over all path parts and check how many of them match
    let score = 0
    const pathParts = path.replace(/\/$/, '').split('/').filter(Boolean)
    const pathToMatchParts = pathToMatch
      .replace(/\/$/, '')
      .split('/')
      .filter(Boolean)

    for (let i = 0; i < pathParts.length; i++) {
      if (pathParts[i] !== pathToMatchParts[i]) {
        // if the path part does not match, exit the loop
        break
      }

      score++
    }

    // if the score is better than the current best match, save it
    if (score > bestMatchScore) {
      bestMatch = pathToMatch
      bestMatchScore = score
    }
  })

  return bestMatch
}

export interface HeaderProps extends SearchbarProps {
  path: string
  links: {
    name: string
    path: string
  }[]
  auth: {
    isLoggedIn: boolean
    user?: {
      fullName: string
    }
    onUserClick: () => void
    onLoginClick: () => void
  }
}

export const Header = (props: HeaderProps) => {
  const {path: activePath, links, searchResultProducts, onSearch} = props

  const {isOpen, onToggle} = useDisclosure()

  const searchbar = (
    <Searchbar
      searchResultProducts={searchResultProducts}
      onSearch={onSearch}
    />
  )

  const bestMatch = findBestMatch(
    activePath,
    links.map(l => l.path)
  )

  const authDisplayName = props.auth.user?.fullName || 'Anmelden'

  const handleAuthClick = () => {
    if (props.auth.isLoggedIn) {
      props.auth.onUserClick()
    } else {
      props.auth.onLoginClick()
    }
  }

  return (
    <>
      <Box
        bg={['agt.gray', 'agt.gray', 'agt.gray', 'agt.gray']}
        color={['white', 'white', 'primary.700', 'primary.700']}
        w="full"
        px={{base: '4', md: '8'}}>
        <Flex
          py={4}
          alignItems={'center'}
          justifyContent={'space-between'}
          maxW="8xl"
          mx="auto">
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            display={{base: 'flex', md: 'none'}}
          />
          <HStack
            as={GatsbyLink}
            to="/"
            cursor={'pointer'}
            spacing={{base: '10', md: '20'}}
            alignItems={'center'}
            maxW="2xl"
            css={styles.Logo}>
            <Logo />
          </HStack>
          <Box display={{base: 'none', md: 'block'}} w="100%">
            <Center>{searchbar}</Center>
          </Box>
          <HStack spacing={4} alignItems={'center'} justifyContent={'flex-end'}>
            <Button
              as={GatsbyLink}
              to="/contact"
              variant="ghost"
              display={{
                base: 'none',
                sm: 'flex'
              }}
              _hover={{
                textDecoration: 'underline'
              }}
              color={['white']}
              colorScheme="agt.grayScheme"
              fontSize={'md'}
              size="sm"
              rounded="md">
              Kontakt
            </Button>

            <Button
              variant="ghost"
              display={{
                base: 'none',
                sm: 'flex'
              }}
              _hover={{
                textDecoration: 'underline'
              }}
              color={['white']}
              colorScheme="agt.grayScheme"
              fontSize={'md'}
              size="sm"
              rounded="md"
              onClick={handleAuthClick}>
              {authDisplayName}
            </Button>

            <Button
              as={GatsbyLink}
              to="/wishlist"
              display={{
                base: 'none',
                sm: 'flex'
              }}
              size="sm"
              rounded="md"
              color={['white']}
              colorScheme="agt.redScheme"
              leftIcon={<FaShoppingBasket />}>
              Warenkorb
            </Button>
            <IconButton
              as={GatsbyLink}
              to="/wishlist"
              display={{
                base: 'flex',
                sm: 'none'
              }}
              icon={<FaShoppingBasket />}
              aria-label="Open Warenkorb"
              colorScheme={'agt.redScheme'}
            />
          </HStack>
        </Flex>

        <Box>
          <Collapse in={isOpen} animateOpacity>
            <Box py="4">
              <Box
                display={{base: 'flex', md: 'none'}}
                w="100%"
                bg="white"
                color="black">
                <Flex direction={'column'} w="100%" py="2">
                  {searchbar}

                  <VStack spacing={4} py={4} align="left" mx={4}>
                    {activePath && <MobileNavItem name="Hauptseite" path="/" />}
                    <MobileNavItem
                      name="Kategorien"
                      path="/"
                      children={links}
                    />
                    <Divider />
                    <ClickMobileNavItem
                      name={
                        <>
                          <Icon as={FaUser} w={4} h={4} />
                          <Box as="span" ml={2}>
                            {authDisplayName}
                          </Box>
                        </>
                      }
                      onClick={handleAuthClick}
                    />
                    <MobileNavItem name="Kontakt" path="/contact" />
                  </VStack>
                </Flex>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>
      <Box
        as="nav"
        bg={useColorModeValue('white', 'gray.700')}
        role="navigation"
        display={{base: 'none', md: 'flex'}}>
        <Flex
          h={12}
          alignItems={'center'}
          justifyContent={'space-between'}
          maxW="8xl"
          mx="auto">
          <HStack
            w="100%"
            as={'nav'}
            spacing={4}
            justifyContent={'space-between'}>
            {links.map((link, i) => (
              <Link
                key={i}
                as={GatsbyLink}
                to={link.path}
                px={2}
                py={1}
                rounded={'md'}
                bg={
                  link.path === bestMatch
                    ? useColorModeValue('gray.200', 'gray.600')
                    : 'transparent'
                }
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.600')
                }}
                _focus={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.600')
                }}>
                <Text fontSize="lg">{link.name}</Text>
              </Link>
            ))}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

interface NavItem {
  name: string
  path: string
  children?: Array<NavItem>
}

const MobileNavItem = ({name, children, path}: NavItem) => {
  const {isOpen, onToggle} = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={GatsbyLink}
        to={!children ? path : '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none'
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {name}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map(child => (
              <Link key={child.name} as={GatsbyLink} to={child.path} py={2}>
                {child.name}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const ClickMobileNavItem = ({
  name,
  onClick
}: {
  name: React.ReactNode
  onClick: () => void
}) => {
  return (
    <Flex
      as={'button'}
      py={2}
      onClick={onClick}
      align={'center'}
      _hover={{
        textDecoration: 'none'
      }}>
      <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
        {name}
      </Text>
    </Flex>
  )
}
