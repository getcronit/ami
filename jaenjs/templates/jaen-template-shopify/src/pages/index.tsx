import {GoogleReview} from '@snek-at/gatsby-plugin-scaleserp'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'
import {graphql, PageProps} from 'gatsby'
import * as React from 'react'
import {Layout} from '../components/Layout'

interface IndexPageData {
  googleReviews: {
    nodes: GoogleReview[]
  }
  productSpotlight: {
    nodes: ShopifyProduct[]
  }
  categoryShowcase: {
    nodes: ShopifyProduct & {
      collections: Array<{
        title: string
      }>
    }
  }
  latestProducts: {
    nodes: ShopifyProduct[]
  }
  featuredProducts: {
    nodes: ShopifyProduct[]
  }
}

// markup
const IndexPage = (props: PageProps<IndexPageData>) => {
  return (
    <Layout path={props.path}>
      {JSON.stringify(props.data)}
      <h1>Your shop homepage</h1>
    </Layout>
  )
}

export const query = graphql`
  query($featuredProductIds: [String!]!) {
    googleReviews: allGoogleReview {
      nodes {
        ...googleReviewData
      }
    }
    productSpotlight: allShopifyProduct(
      filter: {
        metafields: {
          elemMatch: {
            key: {eq: "show"}
            namespace: {eq: "spotlight"}
            value: {eq: "true"}
          }
        }
      }
    ) {
      nodes {
        ...shopifyProductData
      }
    }
    categoryShowcase: allShopifyProduct(
      filter: {
        collections: {
          elemMatch: {
            metafields: {
              elemMatch: {
                key: {eq: "show"}
                namespace: {eq: "showcase"}
                value: {eq: "true"}
              }
            }
          }
        }
      }
      sort: {fields: createdAt}
    ) {
      nodes {
        ...shopifyProductData
        collections {
          title
        }
      }
    }
    latestProducts: allShopifyProduct(
      sort: {fields: createdAt, order: DESC}
      limit: 6
    ) {
      nodes {
        ...shopifyProductData
      }
    }
    featuredProducts: allShopifyProduct(
      filter: {id: {in: $featuredProductIds}}
    ) {
      nodes {
        ...shopifyProductData
      }
    }
  }
`

export default IndexPage
