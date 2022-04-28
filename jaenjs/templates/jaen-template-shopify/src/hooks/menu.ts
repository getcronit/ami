import {graphql, useStaticQuery} from 'gatsby'
import {
  getCollectionStructure,
  ShopifyCollection
} from '@snek-at/gatsby-theme-shopify'

export const useFlatMenu = () => {
  const {navbarCollections} = useStaticQuery<{
    navbarCollections: {
      nodes: Array<{
        title: string
        productsCount: number
        position: {
          value: number
        } | null
      }>
    }
  }>(graphql`
    {
      navbarCollections: allShopifyCollection(
        filter: {
          metafields: {
            elemMatch: {
              key: {eq: "add"}
              namespace: {eq: "menu"}
              value: {eq: "true"}
            }
          }
        }
      ) {
        nodes {
          title
          productsCount
          position: metafield(key: "position", namespace: "menu") {
            value
          }
        }
      }
    }
  `)

  const sortedNodes = navbarCollections.nodes.sort((a, b) => {
    if (a.position && b.position) {
      return a.position.value - b.position.value
    }

    return -1
  })

  const flatMenu = sortedNodes.map(collection => {
    const structure = getCollectionStructure(collection.title)

    return {
      name: structure.name || 'No name',
      productsCount: collection.productsCount,
      path: structure.path
    }
  })

  return flatMenu
}
