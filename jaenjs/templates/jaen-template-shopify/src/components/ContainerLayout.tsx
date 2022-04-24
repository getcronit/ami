import {Box, Container, useColorModeValue} from '@chakra-ui/react'

import React from 'react'

export const ContainerLayout: React.FC = ({children}) => {
  return (
    <>
      <Container
        as="section"
        maxW="8xl"
        pt="6"
        id="featuredproducts"
        bg={useColorModeValue('white', 'gray.700')}
        borderWidth="1px"
        my={{base: 4, md: 8}}
        px={4}
        py={4}
        borderRadius="lg">
        <Box>{children}</Box>
      </Container>
    </>
  )
}
