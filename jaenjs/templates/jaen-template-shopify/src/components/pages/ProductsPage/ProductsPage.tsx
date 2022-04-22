import {Box, Tag} from '@chakra-ui/react'
import {
  ProductsPageContext,
  ProductsPageData,
  ShopifyProduct
} from '@snek-at/gatsby-theme-shopify'
import React from 'react'

export interface ProductsPageProps extends ProductsPageData {
  products: ShopifyProduct[]
  implicitTags: ProductsPageContext['implicitTags']
  tags: ProductsPageContext['tags']
}

export const ProductsPage = (props: ProductsPageProps) => {
  return (
    <>
      <Box>
        {props.products.map(product => (
          <pre key={product.id}>
            {product.title} ({product.tags.join(';')})
          </pre>
        ))}
      </Box>
      <Box>
        {props.implicitTags.map(tag => (
          <Tag key={tag} bg="teal.300">
            {tag}
          </Tag>
        ))}

        {props.tags.map(tag => (
          <Tag key={tag} bg="green.300">
            {tag}
          </Tag>
        ))}
      </Box>
    </>
  )
}
