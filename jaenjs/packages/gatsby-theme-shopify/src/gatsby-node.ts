import type {GatsbyNode} from 'gatsby'

import {createCollectionPages} from './steps/create-collection-pages'
import {createProductPages} from './steps/create-product-pages'
import {createProductsPages} from './steps/create-products-pages'
import {
  ShopifyGeneratorCollectionQueryData,
  ShopifyGeneratorProductQueryData
} from './types'
import {getShopifyEnv} from './utils/env'

const shopifyEnv = getShopifyEnv()

export const createPages: GatsbyNode['createPages'] = async function (
  {actions, graphql, reporter},
  pluginOptions
) {
  const {createPage, createRedirect} = actions

  const productPageTemplate = pluginOptions.productPageTemplate as string
  const collectionPageTemplate = pluginOptions.collectionPageTemplate as string
  const productsPageTemplate = pluginOptions.productsPageTemplate as string

  const shouldProcessCollections =
    shopifyEnv.shopifyConnections?.includes('collections')

  if (
    !productPageTemplate ||
    !collectionPageTemplate ||
    !productsPageTemplate
  ) {
    reporter.info(
      `
        The createPages function in gatsby-theme-shopify/gatsby-node.ts
        is not being called because the productPageTemplate, collectionPageTemplate,
        or productsPageTemplate options are not set in gatsby-config.
        `
    )
    return
  }

  const {data: productData, errors} =
    await graphql<ShopifyGeneratorProductQueryData>(`
    query ShopifyPageGeneratorQuery {
      allShopifyProduct(filter: {status: {eq: ACTIVE}}) {
        tags: distinct(field: tags)
        vendors: distinct(field: vendor)
        productTypes: distinct(field: productType)
        totalCount
        maxPrice: max(field: variants___price)
        minPrice: min(field: variants___price)
        nodes {
          id
          shopifyId
          handle
          updatedAt
          featuredMedia {
            preview {
              image {
                src
              }
            }
          }
          variants {
            price
          }
          tags
          vendor
          productType
          ${
            shouldProcessCollections
              ? `
            collections {
              title
              products {
                id
              }
            }
          `
              : ''
          }
         
        }
        allProductIds: distinct(field: id)
      }
    }
  `)

  if (!productData) {
    reporter.info(
      `
        The createPages function in gatsby-theme-shopify/gatsby-node.ts
        is not being called because no productData was return from the GraphQL query.
        `
    )
    return
  }

  await createProductPages({
    createPage,
    reporter,
    data: {
      allShopifyProduct: productData.allShopifyProduct,
      template: productPageTemplate
    }
  })

  let allShopifyCollection:
    | ShopifyGeneratorCollectionQueryData['allShopifyCollection']
    | undefined = undefined

  if (shouldProcessCollections) {
    const shopifyCollectionQuery =
      await graphql<ShopifyGeneratorCollectionQueryData>(`
        query ShopifyPageGeneratorQuery {
          allShopifyCollection {
            totalCount
            nodes {
              id
              title
              handle
              updatedAt
              products {
                id
                featuredMedia {
                  preview {
                    image {
                      src
                    }
                  }
                }
                variants {
                  price
                }
                tags
                vendor
                productType
              }
            }
          }
        }
      `)

    if (shopifyCollectionQuery.errors) {
      reporter.panic(
        `
        The createPages function in gatsby-theme-shopify/gatsby-node.ts
        is not being called because the query for collections failed.
        `
      )
      return
    }

    const data = shopifyCollectionQuery?.data?.allShopifyCollection

    if (data) {
      allShopifyCollection = data

      await createCollectionPages({
        createPage,
        createRedirect,
        reporter,
        data: {
          collections: allShopifyCollection.nodes,
          template: collectionPageTemplate
        }
      })

      await createProductsPages({
        createPage,
        reporter,
        data: {
          allShopifyProduct: productData.allShopifyProduct,
          collections: allShopifyCollection.nodes,
          template: productsPageTemplate
        }
      })
    }
  } else {
    reporter.info(
      `
      The shopifyConnections option does not include collections.
      Therefore the collection pages will be created based on the product tags.
        `
    )

    const collectionTags = productData.allShopifyProduct.tags
      .filter(tag => tag.startsWith('Kategorie:'))
      .map(tag => {
        const products = productData.allShopifyProduct.nodes.filter(product =>
          product.tags.includes(tag)
        )

        return {
          id: tag,
          updatedAt: new Date(29072003 + products.length).toISOString(),
          title: tag,
          products
        }
      })

    await createCollectionPages({
      createPage,
      createRedirect,
      reporter,
      data: {
        collections: collectionTags,
        template: collectionPageTemplate
      }
    })

    await createProductsPages({
      createPage,
      reporter,
      data: {
        allShopifyProduct: productData.allShopifyProduct,
        collections: collectionTags,
        template: productsPageTemplate
      }
    })
  }
}
