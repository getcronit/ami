import React from 'react'

import {Flex, useColorModeValue, Text, Box, Heading} from '@chakra-ui/react'
import {getProductTags, ShopifyProduct} from '@snek-at/gatsby-theme-shopify'
import {GatsbyImage} from 'gatsby-plugin-image'

export const ProductRow = (props: {
  title: string
  featuredMedia: ShopifyProduct['featuredMedia']['image']
  categoryString: string
  otherString: string
}) => {
  return (
    <Flex>
      <Box
        minW="100"
        boxSize="100"
        bg={useColorModeValue('gray.200', 'gray.600')}>
        <GatsbyImage
          alt={props.featuredMedia.altText || props.title}
          image={props.featuredMedia.gatsbyImageData}
        />
      </Box>

      <Flex ml={4} flexDirection="column" my="auto">
        <Heading as="h3" size="sm" fontWeight="semibold" mb={2}>
          {props.title}
        </Heading>
        <Text fontSize="xs" fontWeight={'thin'}>
          {props.categoryString || ' '}
        </Text>
        <Text fontSize="xs" fontWeight={'thin'}>
          {props.otherString || ' '}
        </Text>
      </Flex>
    </Flex>
  )
}
