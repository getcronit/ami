import {Box, Flex, Heading, Tag} from '@chakra-ui/react'
import {
  CollectionPageData,
  getCollectionStructure
} from '@snek-at/gatsby-theme-shopify'
import React from 'react'

export interface CollectionPageProps extends CollectionPageData {}

export const CollectionPage = (props: CollectionPageProps) => {
  return (
    <>
      <Box m="4">
        <Heading>
          {getCollectionStructure(props.shopifyCollection.title).name}
        </Heading>

        <Tag bg="teal.300">{props.shopifyCollection.handle}</Tag>
        <Tag bg="green.300">{props.shopifyCollection.productsCount}</Tag>

        <Flex>
          {props.subCollections.nodes.map(subCollection => (
            <Box key={subCollection.handle}>
              {getCollectionStructure(subCollection.title).name}
              <Tag>{subCollection.productsCount}</Tag>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box>
        {props.relatedProducts.nodes.map(product => (
          <pre key={product.id}>
            {product.title} ({product.tags.join(';')})
          </pre>
        ))}
      </Box>
      <Box></Box>
    </>
  )
}
