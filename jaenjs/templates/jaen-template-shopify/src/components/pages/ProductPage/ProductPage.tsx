import {Box, Flex} from '@chakra-ui/react'
import {
  getFormattedProductPrices,
  ProductPageData
} from '@snek-at/gatsby-theme-shopify'
import {GatsbyImage} from 'gatsby-plugin-image'
import React from 'react'

export interface ProductPageProps extends ProductPageData {}

export const ProductPage = (props: ProductPageProps) => {
  const {shopifyProduct, relatedProducts} = props

  const {priceFormatted, compareAtPriceFormatted} =
    getFormattedProductPrices(shopifyProduct)

  return (
    <>
      <Box>
        <h1>{shopifyProduct.title}</h1>
        <div
          dangerouslySetInnerHTML={{__html: shopifyProduct.descriptionHtml}}
        />
        <p>{priceFormatted}</p>
        <p>{compareAtPriceFormatted}</p>
        <GatsbyImage
          image={shopifyProduct.featuredMedia.image.gatsbyImageData}
          alt={shopifyProduct.featuredMedia.image.altText}
        />
      </Box>
      <Flex direction={'row'}>
        {relatedProducts.nodes.map(product => (
          <Box key={product.id} boxSize="sm">
            <h2>{product.title}</h2>
            <GatsbyImage
              image={product.featuredMedia.image.gatsbyImageData}
              alt={product.featuredMedia.image.altText}
            />
          </Box>
        ))}
      </Flex>
    </>
  )
}
