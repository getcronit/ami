import React from 'react'
import {Box, Heading, Text, Link, BoxProps} from '@chakra-ui/react'
import {useCookieState} from '../../services/cookiemodal'

export interface GoogleMapsProps extends BoxProps {
  src: string
}

export const GoogleMaps = ({src, ...props}: GoogleMapsProps) => {
  const cookieState = useCookieState()

  const handleAccept = () => {
    cookieState.updateCookie('analytics', true)
    cookieState.accept(true)
  }

  if (!cookieState.cookie.analytics) {
    return (
      <Box bg="gray.200">
        <Heading as="h1" size="xl">
          Google Maps is nicht verfügbar
        </Heading>
        <Text as="h2" size="lg">
          Durch Ihre Cookie Einstellungen können wir Google Maps nicht anzeigen.
        </Text>
        <Text as="h2" size="lg">
          Bitte aktivieren Sie Cookies, um Google Maps anzuzeigen.{' '}
          <Link onClick={handleAccept}>Analytics Cookie aktivieren</Link>
        </Text>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <iframe
        src={src}
        width="100%"
        height="600"
        style={{
          border: 1
        }}
        loading="lazy"
      />
    </Box>
  )
}

export default GoogleMaps
