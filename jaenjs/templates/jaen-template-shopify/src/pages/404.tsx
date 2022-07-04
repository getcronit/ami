import {Box, Button, Heading, Text} from '@chakra-ui/react'
import {SearchProvider} from '@snek-at/gatsby-theme-shopify'
import {Link, PageProps} from 'gatsby'
import * as React from 'react'
import {Layout} from '../components/Layout'

// markup
const NotFoundPage = (props: PageProps) => {
  return (
    <SearchProvider>
      <Layout path={props.path}>
        <Box textAlign="center" py={10} px={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, agt.blueScheme.300, agt.blueScheme.600)"
            backgroundClip="text">
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Seite nicht gefunden
          </Text>
          <Text color={'gray.500'} mb={6}>
            Die Seite die Sie suchen scheint nicht zu existieren
          </Text>

          <Button
            as={Link}
            to="/"
            colorScheme="teal"
            bgGradient="linear(to-r,  agt.blueScheme.300,  agt.blueScheme.500,  agt.blueScheme.600)"
            color="white"
            variant="solid">
            Zur Startseite
          </Button>
        </Box>
      </Layout>
    </SearchProvider>
  )
}

export default NotFoundPage
