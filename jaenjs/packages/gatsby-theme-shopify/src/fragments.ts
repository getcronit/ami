import {graphql} from 'gatsby'

export const shopifyData = graphql`
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

  fragment shopifyCollectionData on ShopifyCollection {
    title
    handle
    productsCount
    description
    image {
      src
      gatsbyImageData
      altText
    }
  }
`
