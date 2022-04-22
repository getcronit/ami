import {graphql, PageProps} from 'gatsby'
import React from 'react'

import {
  CollectionPageData,
  ColllectionPageContext
} from '@snek-at/gatsby-theme-shopify'
import {CollectionPage} from '../components/pages'
import { Layout } from '../components/Layout'

const CollectionPageTemplate = (
  props: PageProps<CollectionPageData, ColllectionPageContext>
) => {
  const {shopifyCollection, subCollections, relatedProducts} = props.data

  return (
    <Layout>
      <CollectionPage
        shopifyCollection={shopifyCollection}
        subCollections={subCollections}
        relatedProducts={relatedProducts}
      />
    </Layout>
  )
}

export const query = graphql`
  query (
    $collectionId: String!
    $subCollectionIds: [String!]!
    $relatedProductIds: [String!]!
  ) {
    shopifyCollection(id: {eq: $collectionId}) {
      title
      handle
      productsCount
    }
    subCollections: allShopifyCollection(
      filter: {id: {in: $subCollectionIds}}
    ) {
      nodes {
        title
        handle
        productsCount
      }
    }
    relatedProducts: allShopifyProduct(filter: {id: {in: $relatedProductIds}}) {
      nodes {
        ...shopifyProductData
      }
    }
  }
`

export default CollectionPageTemplate
