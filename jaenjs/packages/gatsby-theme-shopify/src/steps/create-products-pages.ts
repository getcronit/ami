import {Actions, Reporter} from 'gatsby'
import {PRODUCTS_PAGE_PRODUCTS_PER_PAGE_LIMIT} from '../constants'
import {ShopifyPageGeneratorQueryData, ProductsPageContext} from '../types'
import {
  filterCollectionRelevantTags,
  getCollectionStructure
} from '../utils/collection'
import {validateCollection} from './validate-collection'

interface CreateProductsPages {
  createPage: Actions['createPage']
  reporter: Reporter
  data: {
    allShopifyProduct: ShopifyPageGeneratorQueryData['allShopifyProduct']
    allShopifyCollection: ShopifyPageGeneratorQueryData['allShopifyCollection']
    template: string
  }
}

const processCollections = async (
  createPage: Actions['createPage'],
  reporter: Reporter,
  data: {
    allShopifyCollection: ShopifyPageGeneratorQueryData['allShopifyCollection']
    template: string
  }
) => {
  const {allShopifyCollection, template} = data

  reporter.info(
    `Creating pages for ${allShopifyCollection.totalCount} collections`
  )

  for (const collection of allShopifyCollection.nodes) {
    const {path, structName} = getCollectionStructure(collection.title)

    const isValid = await validateCollection({
      reporter,
      data: {collection}
    })

    if (isValid) {
      const collectionProductsPagePath = `${path}/products`

      const maxPrice = Math.max(
        ...collection.products.map(product =>
          Math.max(...product.variants.map(variant => variant.price))
        )
      )

      const minPrice = Math.min(
        ...collection.products.map(product =>
          Math.min(...product.variants.map(variant => variant.price))
        )
      )

      const implicitTags = [`Kategorie:${structName}`]

      const uniqueTags = [
        ...new Set(collection.products.map(product => product.tags).flat())
      ]

      const tags = filterCollectionRelevantTags(uniqueTags, collection.title)

      createPage<ProductsPageContext>({
        path: collectionProductsPagePath,
        component: template,
        context: {
          skipJaenPage: true,
          collectionId: collection.id,
          totalProductsPerPage: PRODUCTS_PAGE_PRODUCTS_PER_PAGE_LIMIT,
          maxPrice,
          minPrice,
          implicitTags,
          tags
        }
      })
    }
  }
}

export const createProductsPages = async ({
  createPage,
  reporter,
  data
}: CreateProductsPages) => {
  const {allShopifyCollection, allShopifyProduct, template} = data

  reporter.info(
    `Creating shop pages with ${PRODUCTS_PAGE_PRODUCTS_PER_PAGE_LIMIT} initial products`
  )

  const tags = allShopifyProduct.tags

  createPage<ProductsPageContext>({
    path: '/products',
    component: template,
    context: {
      skipJaenPage: true,
      totalProductsPerPage: PRODUCTS_PAGE_PRODUCTS_PER_PAGE_LIMIT,
      maxPrice: allShopifyProduct.maxPrice,
      minPrice: allShopifyProduct.minPrice,
      implicitTags: [],
      tags: tags
    }
  })

  await processCollections(createPage, reporter, data)

  reporter.success(
    `Created products pages for ${allShopifyCollection.totalCount} collections`
  )
}
