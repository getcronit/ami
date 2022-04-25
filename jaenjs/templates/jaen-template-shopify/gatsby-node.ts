import type {GatsbyNode} from 'gatsby'

import {shuffle} from './src/helper/shuffle'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  cache
}) => {
  const {data} = await graphql<{
    allShopifyProduct: {
      nodes: Array<{
        id: string
      }>
    }
  }>(`
    {
      allShopifyProduct {
        nodes {
          id
        }
      }
    }
  `)

  const featuredProducts = shuffle(data.allShopifyProduct.nodes, 29072003)
  const featuredProductIds = featuredProducts.slice(0, 12).map(({id}) => id)

  // cache the featured product ids
  cache.set(`featuredProductIds`, featuredProductIds)
}

export const onCreatePage: GatsbyNode['onCreatePage'] = async ({
  page,
  actions,
  cache
}) => {
  const {createPage, deletePage} = actions
  const {path} = page

  console.log(`path: ${path}`)

  // && !page.context.featuredProductIds is a hack to prevent the onCreatePage
  // from running into an infinite loop.. I have no idea why this is happening,
  // but sadly it is. Gatsby should be able to handle this, but for some reason
  // it doesn't.
  // Ref: https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
  if (path === '/' && !page.context.featuredProductIds) {
    deletePage(page)

    // get featured products from cache
    const featuredProductIds = (await cache.get(
      `featuredProductIds`
    )) as string[]

    // create new page
    createPage({
      ...page,
      context: {
        ...page.context,
        featuredProductIds
      }
    })
  }
}
