import {graphql} from 'gatsby'

export const shopifyProductData = graphql`
  fragment shopifyProductData on ShopifyProduct {
    variants {
      id
      taxable
      sku
      compareAtPrice
      price
    }
    hasOnlyDefaultVariant
    id
    handle
    description
    descriptionHtml
    title
    tags
    status
    totalInventory
    createdAt
    vendor
    productType
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
