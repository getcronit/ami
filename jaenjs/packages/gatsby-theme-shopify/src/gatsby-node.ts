import type {GatsbyNode} from 'gatsby'
import {graphql} from 'gatsby'

import {createCollectionPages} from './steps/create-collection-pages'
import {createProductPages} from './steps/create-product-pages'
import {createProductsPages} from './steps/create-products-pages'
import {ShopifyPageGeneratorQueryData} from './types'

export const createPages: GatsbyNode['createPages'] = async function (
  {actions, graphql, reporter},
  pluginOptions
) {
  const productPageTemplate = pluginOptions.productPageTemplate as string
  const collectionPageTemplate = pluginOptions.collectionPageTemplate as string
  const productsPageTemplate = pluginOptions.productsPageTemplate as string

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

  const {data} = await graphql<ShopifyPageGeneratorQueryData>(`
    query ShopifyPageGeneratorQuery {
      allShopifyProduct {
        tags: distinct(field: tags)
        totalCount
        maxPrice: max(field: variants___price)
        minPrice: min(field: variants___price)
        nodes {
          id
          handle
          updatedAt
          collections {
            title
            products {
              id
            }
          }
        }
        allProductIds: distinct(field: id)
      }
      allShopifyCollection {
        totalCount
        nodes {
          id
          title
          handle
          updatedAt
          products {
            id
            variants {
              price
            }
            tags
          }
        }
      }
    }
  `)

  const {createPage, createRedirect} = actions

  if (!data) {
    reporter.info(
      `
        The createPages function in gatsby-theme-shopify/gatsby-node.ts
        is not being called because no data was return from the GraphQL query.
        `
    )
    return
  }

  await createProductPages({
    createPage,
    reporter,
    data: {
      allShopifyProduct: data.allShopifyProduct,
      template: productPageTemplate
    }
  })

  await createProductsPages({
    createPage,
    reporter,
    data: {
      allShopifyProduct: data.allShopifyProduct,
      allShopifyCollection: data.allShopifyCollection,
      template: productsPageTemplate
    }
  })

  await createCollectionPages({
    createPage,
    createRedirect,
    reporter,
    data: {
      allShopifyCollection: data.allShopifyCollection,
      template: collectionPageTemplate
    }
  })
}
