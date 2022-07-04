import {Actions, Reporter} from 'gatsby'
import {PRODUCTS_PAGE_PRODUCTS_PER_PAGE_LIMIT} from '../constants'
import {ProductsPageContext, ShopifyGeneratorProductQueryData} from '../types'
import {
  cleanProductTypes,
  cleanVendors,
  filterCollectionRelevantTags,
  getCollectionStructure
} from '../utils/collection'
import {validateCollection} from './validate-collection'

type Collections = Array<{
  id: string
  title: string
  products: Array<{
    variants: Array<{
      price: number
    }>
    tags: string[]
    vendor: string
    productType: string
  }>
}>

interface CreateProductsPages {
  createPage: Actions['createPage']
  reporter: Reporter
  data: {
    allShopifyProduct: ShopifyGeneratorProductQueryData['allShopifyProduct']
    collections: Collections
    template: string
  }
}

const processCollections = async (
  createPage: Actions['createPage'],
  reporter: Reporter,
  data: {
    collections: Collections
    template: string
  }
) => {
  const {collections, template} = data

  reporter.info(`Creating pages for ${collections.length} collections`)

  for (const {id, title, products} of collections) {
    const {path, structName} = getCollectionStructure(title)

    const isValid = await validateCollection({
      reporter,
      data: {
        id,
        title,
        handle: path
      }
    })

    if (isValid) {
      const collectionProductsPagePath = `${path}/products`

      const maxPrice = Math.max(
        ...products.map(product =>
          Math.max(...product.variants.map(variant => variant.price))
        )
      )

      const minPrice = Math.min(
        ...products.map(product =>
          Math.min(...product.variants.map(variant => variant.price))
        )
      )

      const implicitTags = [`Kategorie:${structName}`]

      const uniqueTags = [
        ...new Set(products.map(product => product.tags).flat())
      ]

      const tags = filterCollectionRelevantTags(uniqueTags, title)

      const vendors = cleanVendors([
        ...new Set(products.map(product => product.vendor))
      ])

      const productTypes = cleanProductTypes([
        ...new Set(products.map(product => product.productType))
      ])

      createPage<ProductsPageContext>({
        path: collectionProductsPagePath,
        component: template,
        context: {
          skipJaenPage: true,
          collectionId: id,
          totalProductsPerPage: PRODUCTS_PAGE_PRODUCTS_PER_PAGE_LIMIT,
          maxPrice,
          minPrice,
          implicitTags,
          tags,
          vendors,
          productTypes
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
  const {collections, allShopifyProduct, template} = data

  reporter.info(
    `Creating shop pages with ${PRODUCTS_PAGE_PRODUCTS_PER_PAGE_LIMIT} initial products`
  )

  const tags = allShopifyProduct.tags
  const vendors = cleanVendors(allShopifyProduct.vendors)
  const productTypes = cleanProductTypes(allShopifyProduct.productTypes)

  createPage<ProductsPageContext>({
    path: '/products',
    component: template,
    context: {
      skipJaenPage: true,
      totalProductsPerPage: PRODUCTS_PAGE_PRODUCTS_PER_PAGE_LIMIT,
      maxPrice: allShopifyProduct.maxPrice,
      minPrice: allShopifyProduct.minPrice,
      implicitTags: [],
      tags: tags,
      vendors,
      productTypes
    }
  })

  await processCollections(createPage, reporter, {
    collections,
    template
  })

  reporter.success(
    `Created products pages for ${collections.length} collections`
  )
}
