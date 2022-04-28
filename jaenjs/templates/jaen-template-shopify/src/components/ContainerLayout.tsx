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
        mt={{base: 4, md: 12}}
        mb={{base: 8, md: 24}}
        px={4}
        py={4}
        borderRadius="lg">
        <Box>{children}</Box>
      </Container>
    </>
  )
}
