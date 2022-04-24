import {graphql, PageProps} from 'gatsby'
import React from 'react'

import {
  CollectionPageData,
  ColllectionPageContext
} from '@snek-at/gatsby-theme-shopify'
import {CollectionTemplate} from '../components/templates'
import {Layout} from '../components/Layout'

const CollectionPageTemplate = (
  props: PageProps<CollectionPageData, ColllectionPageContext>
) => {
  const {shopifyCollection, subCollections, relatedProducts} = props.data

  return (
    <Layout path={props.path}>
      <CollectionTemplate
        path={props.path}
        shopifyCollection={shopifyCollection}
        subCollections={subCollections}
        relatedProducts={relatedProducts}
      />
    </Layout>
  )
}

export const query = graphql`
  query(
    $collectionId: String!
    $subCollectionIds: [String!]!
    $relatedProductIds: [String!]!
  ) {
    shopifyCollection(id: {eq: $collectionId}) {
      title
      handle
      productsCount
      image {
        gatsbyImageData
        altText
      }
    }
    subCollections: allShopifyCollection(
      filter: {id: {in: $subCollectionIds}}
      sort: {fields: productsCount, order: DESC}
    ) {
      nodes {
        title
        handle
        productsCount
        image {
          gatsbyImageData
          altText
        }
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
