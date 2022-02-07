import {Box, Link, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import {connectNotification, NotifyField, useModalContext} from '@jaenjs/jaen'
import {SubscribeForm} from '../components/SubscribeForm'

const CookieModal = () => {
  const {onClose} = useModalContext()
  return (
    <Stack
      maxW="xs"
      mx="auto"
      py={{base: '12', md: '16'}}
      spacing={{base: '6', md: '10'}}>
      <Stack spacing="3" textAlign="center">
        <NotifyField.TextField
          name="email"
          style={{
            fontSize: 'lg',
            textAlign: 'center'
          }}
          defaultValue="Enter your email below &amp; get"
        />
        <Text
          color={useColorModeValue('blue.500', 'blue.200')}
          fontWeight="extrabold"
          fontSize={{base: '5xl', md: '6xl'}}
          textTransform="uppercase"
          transform="scale(1.2)">
          20% off
        </Text>
        <Text fontSize="lg">
          <Box as="span" whiteSpace="nowrap" fontWeight="bold">
            on your next purchase
          </Box>{' '}
          + exclusive access to new products
        </Text>
      </Stack>
      <SubscribeForm />
      <Link
        fontSize="sm"
        textAlign="center"
        color={useColorModeValue('gray.600', 'gray.400')}
        textDecoration="underline"
        onClick={onClose}>
        No, I don’t want discounts
      </Link>
    </Stack>
  )
}

export default connectNotification(CookieModal, {
  displayName: 'CookieModal',
  description:
    'This is a modal that appears when a user visits a page for the first time. You should not disable this modal.',
  position: 'modal-center',
  positionProps: {
    borderRadius: '2xl',
    mx: '4'
  },
  conditions: {
    entireSite: true
  },
  triggers: {
    onPageScroll: {
      percentage: 0.5,
      direction: 'down'
    }
  },
  advanced: {
    showUntilXPageViews: 5
  }
})
