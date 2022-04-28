export const StorefrontProductsQuery = `
  query ($query: String!, $sortKey: ProductSortKeys, $first: Int, $last: Int, $after: String, $before: String, $reverse: Boolean) {
    products(
      query: $query
      sortKey: $sortKey
      first: $first
      last: $last
      after: $after
      before: $before
      reverse: $reverse
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          title
          handle
          descriptionHtml
          totalInventory
          createdAt
          vendor
          productType
          variants(first: 100) {
            nodes {
              price
              sku
              id
              compareAtPrice
            }
            edges {
              node {
                id
              }
            }
          }
          id
          tags
          featuredImage {
            id
            url
            width
            height
            altText
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                width
                height
                altText
              }
            }
          }
        }
      }
    }
  }
`
