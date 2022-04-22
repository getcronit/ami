import {graphql, PageProps} from 'gatsby'
import React from 'react'

import {
  ProductPageContext,
  ProductPageData
} from '@snek-at/gatsby-theme-shopify'
import {ProductPage} from '../components/pages'
import {Layout} from '../components/Layout'

const ProductPageTemplate = (
  props: PageProps<ProductPageData, ProductPageContext>
) => {
  return (
    <Layout>
      <ProductPage
        shopifyProduct={props.data.shopifyProduct}
        relatedProducts={props.data.relatedProducts}
      />
    </Layout>
  )
}

export const query = graphql`
  query ($productId: String!, $relatedProductIds: [String!]!) {
    relatedProducts: allShopifyProduct(filter: {id: {in: $relatedProductIds}}) {
      nodes {
        ...shopifyProductData
      }
    }
    shopifyProduct(id: {eq: $productId}) {
      ...shopifyProductData
    }
  }
`

export default ProductPageTemplate
