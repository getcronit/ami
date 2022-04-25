import {graphql} from 'gatsby'

export const shopifyProductData = graphql`
  fragment shopifyProductData on ShopifyProduct {
    variants {
      id
      sku
      compareAtPrice
      price
    }
    hasOnlyDefaultVariant
    id
    handle
    descriptionHtml
    title
    tags
    status
    totalInventory
    createdAt
    media {
      ... on ShopifyMediaImage {
        id
        image {
          gatsbyImageData
          altText
        }
      }
    }
    featuredMedia {
      ... on ShopifyMediaImage {
        id
        image {
          gatsbyImageData
          altText
        }
      }
    }
    metafields {
      key
      value
      namespace
    }
  }
`
