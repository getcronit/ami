// import {graphql, PageProps} from 'gatsby'
// import React from 'react'

// import {SEO} from '@jaenjs/jaen'
// import {
//   CollectionPageData,
//   ColllectionPageContext,
//   getCollectionStructure
// } from '@snek-at/gatsby-theme-shopify'
// import {CollectionTemplate} from '../components/templates'
// import {Layout} from '../components/Layout'

// const CollectionPageTemplate = (
//   props: PageProps<CollectionPageData, ColllectionPageContext>
// ) => {
//   const {shopifyCollection, subCollections, relatedProducts} = props.data

//   const buildCollectionPageMeta = () => {
//     const {name} = getCollectionStructure(shopifyCollection.title)

//     if (name) {
//       const description =
//         shopifyCollection.description +
//         ' | Unterkategorien: ' +
//         subCollections.nodes.map(n => n.title).join(', ') +
//         ' | Weitere Produkte: ' +
//         relatedProducts.nodes.map(n => n.title).join(', ')

//       return {
//         title: name,
//         description: description,
//         image: shopifyCollection.image?.src
//       }
//     }
//   }

//   return (
//     <>
//       <SEO pagePath={props.path} pageMeta={buildCollectionPageMeta()} />
//       <Layout path={props.path}>
//         <CollectionTemplate
//           path={props.path}
//           shopifyCollection={shopifyCollection}
//           subCollections={subCollections}
//           relatedProducts={relatedProducts}
//         />
//       </Layout>
//     </>
//   )
// }

// export const query = graphql`
//   query(
//     $collectionId: String!
//     $subCollectionIds: [String!]!
//     $relatedProductIds: [String!]!
//   ) {
//     shopifyCollection(id: {eq: $collectionId}) {
//       ...shopifyCollectionData
//     }
//     subCollections: allShopifyCollection(
//       filter: {id: {in: $subCollectionIds}}
//       sort: {fields: productsCount, order: DESC}
//     ) {
//       nodes {
//         ...shopifyCollectionData
//       }
//     }
//     relatedProducts: allShopifyProduct(filter: {id: {in: $relatedProductIds}}) {
//       nodes {
//         ...shopifyProductData
//       }
//     }
//   }
// `

// export default CollectionPageTemplate

import {graphql, PageProps} from 'gatsby'
import React from 'react'

import {SEO} from '@jaenjs/jaen'
import {
  CollectionPageData,
  ColllectionPageContext,
  getCollectionStructure
} from '@snek-at/gatsby-theme-shopify'
import {Layout} from '../components/Layout'
import {CollectionTemplate} from '../components/templates'

const CollectionPageTemplate = (
  props: PageProps<CollectionPageData, ColllectionPageContext>
) => {
  const {relatedProducts} = props.data
  const {shopifyCollection, shopifySubCollections} = props.pageContext

  const buildCollectionPageMeta = () => {
    const {name} = getCollectionStructure(props.pageContext.collectionId)

    if (shopifyCollection && name) {
      const description =
        shopifyCollection.description +
        ' | Unterkategorien: ' +
        shopifySubCollections.nodes.map(n => n.title).join(', ') +
        ' | Weitere Produkte: ' +
        relatedProducts.nodes.map(n => n.title).join(', ')

      return {
        title: name,
        description: description,
        image: shopifyCollection.image?.src
      }
    }
  }

  return (
    <>
      {props.data.shopifyCollection}
      <SEO pagePath={props.path} pageMeta={buildCollectionPageMeta()} />
      <Layout path={props.path}>
        <CollectionTemplate
          path={props.path}
          shopifyCollection={shopifyCollection}
          subCollections={shopifySubCollections}
          relatedProducts={relatedProducts}
        />
      </Layout>
    </>
  )
}

export const query = graphql`
  query($relatedProductIds: [String!]!) {
    relatedProducts: allShopifyProduct(filter: {id: {in: $relatedProductIds}}) {
      nodes {
        ...shopifyProductData
      }
    }
  }
`

export default CollectionPageTemplate
