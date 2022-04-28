import React, {ReactNode} from 'react'
import {
  Box,
  BoxProps,
  chakra,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  StackDivider,
  Heading,
  SimpleGrid,
  SimpleGridProps,
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
  HTMLChakraProps,
  Input,
  Button
} from '@chakra-ui/react'
import {HeadingProps, TextProps} from '@chakra-ui/layout'
import {FiInstagram} from '@react-icons/all-files/fi/FiInstagram'
import {FiGithub} from '@react-icons/all-files/fi/FiGithub'
import {FiFacebook} from '@react-icons/all-files/fi/FiFacebook'

import {Logo} from '../../../common/assets/Logo'

export interface FooterProps {
  col1h: React.ReactNode
  col1: React.ReactNode[]
  col2h: React.ReactNode
  col2: React.ReactNode[]
  col3h: React.ReactNode
  col3: React.ReactNode[]
}

const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} snek.at; All rights reserved.
  </Text>
)

const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="agt.red" {...props}>
    <IconButton
      target={'_blank'}
      as="a"
      href="https://instagram.com"
      aria-label="Instagram"
      icon={<FiInstagram fontSize="20px" />}
    />
    <IconButton
      target={'_blank'}
      as="a"
      href="https://facebook.com"
      aria-label="Facebook"
      icon={<FiFacebook fontSize="20px" />}
    />
    <IconButton
      target={'_blank'}
      as="a"
      href="https://github.com/snek-at/agt-guntrade-shop"
      aria-label="GitHub"
      icon={<FiGithub fontSize="20px" />}
    />
  </ButtonGroup>
)

const SubscribeForm = (props: HTMLChakraProps<'form'>) => {
  return (
    <chakra.form {...props} onSubmit={e => e.preventDefault()}>
      <Stack spacing="4">
        <FooterHeading>Subscribe to our newsletter</FooterHeading>
        <Text>
          Get notified when we add new components or we have exciting news for
          you.
        </Text>
        <Stack spacing="4" direction={{base: 'column', md: 'row'}}>
          <Input
            bg={useColorModeValue('white', 'inherit')}
            placeholder="Enter your email"
            type="email"
            required
            focusBorderColor={useColorModeValue('red.500', 'red.300')}
            _placeholder={{
              opacity: 1,
              color: useColorModeValue('gray.500', 'whiteAlpha.700')
            }}
          />
          <Button
            type="submit"
            colorScheme="red"
            flexShrink={0}
            width={{base: 'full', md: 'auto'}}>
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </chakra.form>
  )
}

const FooterHeading = (props: HeadingProps) => (
  <Heading
    as="h4"
    color={useColorModeValue('gray.600', 'gray.400')}
    fontSize="sm"
    fontWeight="semibold"
    textTransform="uppercase"
    letterSpacing="wider"
    {...props}
  />
)

const LinkGrid = ({
  col1h,
  col1,
  col2h,
  col2,
  ...props
}: SimpleGridProps & {
  col1h: React.ReactNode
  col1: React.ReactNode[]
  col2h: React.ReactNode
  col2: React.ReactNode[]
}) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">{col1h}</FooterHeading>
      <Stack>
        {col1.map((link, index) => (
          <Box key={index}>{link}</Box>
        ))}
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">{col2h}</FooterHeading>
      <Stack>
        {col2.map((link, index) => (
          <Box key={index}>{link}</Box>
        ))}
      </Stack>
    </Box>
  </SimpleGrid>
)

const Businesshours = ({
  col3h,
  col3,
  ...props
}: SimpleGridProps & {
  col3h: React.ReactNode
  col3: React.ReactNode[]
}) => (
  <Box {...props}>
    <FooterHeading mb="4">{col3h}</FooterHeading>
    <Stack>
      {col3.map((link, index) => (
        <Text key={index}>{link}</Text>
      ))}
    </Stack>
  </Box>
)

const SocialButton = ({
  children,
  label,
  href
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export const Footer = ({
  col1h,
  col1,
  col2h,
  col2,
  col3h,
  col3
}: FooterProps) => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="8xl"
      py="12"
      px={{base: '4', md: '8'}}>
      <Stack spacing="10" divider={<StackDivider />}>
        <Stack
          direction={{base: 'column', lg: 'row'}}
          spacing={{base: '10', lg: '28'}}>
          <Box flex="1">
            <Logo />
          </Box>
          <Stack
            direction={{base: 'column', md: 'row'}}
            spacing={{base: '10', md: '20'}}>
            <LinkGrid
              col1h={col1h}
              col1={col1}
              col2h={col2h}
              col2={col2}
              spacing={{base: '10', md: '20', lg: '28'}}
              flex="1"
            />
            {/* <SubscribeForm width={{ base: 'full', md: 'sm' }} /> */}
            <Businesshours
              col3h={col3h}
              col3={col3}
              width={{base: 'full', md: 'sm'}}
            />
          </Stack>
        </Stack>
        <Stack
          direction={{base: 'column-reverse', md: 'row'}}
          justifyContent="space-between"
          alignItems="center">
          <Copyright />
          <SocialMediaLinks />
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
