import {getCollectionStructure} from '@snek-at/gatsby-theme-shopify'
import {graphql, useStaticQuery} from 'gatsby'

// export const useFlatMenu = () => {
//   const {navbarCollections} = useStaticQuery<{
//     navbarCollections: {
//       nodes: Array<{
//         title: string
//         productsCount: number
//         position: {
//           value: number
//         } | null
//       }>
//     }
//   }>(graphql`
//     {
//       navbarCollections: allShopifyCollection(
//         filter: {
//           metafields: {
//             elemMatch: {
//               key: {eq: "add"}
//               namespace: {eq: "menu"}
//               value: {eq: "true"}
//             }
//           }
//         }
//       ) {
//         nodes {
//           title
//           productsCount
//           position: metafield(key: "position", namespace: "menu") {
//             value
//           }
//         }
//       }
//     }
//   `)

//   const sortedNodes = navbarCollections.nodes.sort((a, b) => {
//     if (a.position && b.position) {
//       return a.position.value - b.position.value
//     }

//     return -1
//   })

//   const flatMenu = sortedNodes.map(collection => {
//     const structure = getCollectionStructure(collection.title)

//     return {
//       name: structure.name || 'No name',
//       productsCount: collection.productsCount,
//       path: structure.path
//     }
//   })

//   return flatMenu
// }

export const useFlatMenu = () => {
  const {products} = useStaticQuery<{
    products: {
      allTags: string[]
      nodes: Array<{
        tags: string[]
      }>
    }
  }>(graphql`
    {
      products: allShopifyProduct {
        allTags: distinct(field: tags)
        nodes {
          tags
        }
      }
    }
  `)

  const flatMenuTags: Array<{
    name: string
    productsCount: number
    path: string
  }> = products.allTags
    .filter(tag => tag.startsWith('Kategorie:') && tag.split(':').length === 2)
    .map(tag => {
      const structure = getCollectionStructure(tag)

      const productsCount = products.nodes.filter(product =>
        product.tags.includes(tag)
      ).length

      return {
        name: structure.name || 'No name',
        productsCount,
        path: structure.path
      }
    })

  // sort by productsCount
  return flatMenuTags.sort((a, b) => b.productsCount - a.productsCount)
}
