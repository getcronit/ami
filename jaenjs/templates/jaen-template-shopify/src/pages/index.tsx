import * as React from 'react'
import {GoogleReview} from '@snek-at/gatsby-plugin-scaleserp'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'
import {graphql, PageProps} from 'gatsby'
import {connectPage} from '@jaenjs/jaen'

import {Layout} from '../components/Layout'
import {HomeTemplate} from '../components/templates'
import {
  FeaturedProductsSection,
  HeroSection,
  ReviewSection
} from '../components/organisms/sections'

interface IndexPageData {
  googleReviews: {
    nodes: GoogleReview[]
  }
  productSpotlight: {
    nodes: ShopifyProduct[]
  }
  categoryShowcase: {
    nodes: Array<
      ShopifyProduct & {
        collections: Array<{
          title: string
        }>
      }
    >
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
      <HomeTemplate
        heroSection={{
          latestProducts: props.data.latestProducts.nodes,
          categoryProducts: props.data.categoryShowcase.nodes,
          spotlightProducts: props.data.productSpotlight.nodes
        }}
        featuredProductsSection={{
          heading: 'Featured Products',
          featuredProducts: props.data.featuredProducts.nodes
        }}
        reviewSection={{
          heading: 'Heading',
          googleReviews: props.data.googleReviews.nodes
        }}
        faqSection={{heading: 'Heading'}}
        aboutSection={{heading: 'Heading', teaser: '', text: ''}}
      />
    </Layout>
  )
}

export const query = graphql`
  query($featuredProductIds: [String!]!, $jaenPageId: String!) {
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
    ...JaenPageQuery
  }
`

export default connectPage(IndexPage, {
  displayName: 'IndexPage'
})
