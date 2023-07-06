import {Actions, Reporter} from 'gatsby'
import {
  ProductPageContext,
  ShopifyGeneratorProductQueryData,
  ShopifyProduct
} from '../types'
import {getCollectionStructure} from '../utils/collection'
import {getLimitedRelatedProducts, getProductTags} from '../utils/products'

interface CreateProductPages {
  createPage: Actions['createPage']
  reporter: Reporter
  data: {
    allShopifyProduct: ShopifyGeneratorProductQueryData['allShopifyProduct']
    shouldCreateCollectionPages: boolean
    template: string
  }
}

export const createProductPages = async ({
  createPage,
  reporter,
  data
}: CreateProductPages) => {
  const {shouldCreateCollectionPages, allShopifyProduct, template} = data

  for (const {
    id,
    handle,
    updatedAt,
    collections,
    tags
  } of allShopifyProduct.nodes) {
    const relatedProducts: Array<string> = []

    const finalCollections =
      collections ||
      getProductTags({tags} as ShopifyProduct).categoryTags.map(category => {
        return {
          title: category,
          products: allShopifyProduct.nodes.filter(product =>
            product.tags.includes(category)
          )
        }
      })

    // merge products from collections
    for (const {products, title} of finalCollections) {
      const collectionRelatedProducts: Array<string> = []
      for (const product of products) {
        if (product.id === id) {
          continue
        }

        collectionRelatedProducts.push(product.id)
      }

      if (shouldCreateCollectionPages) {
        const collectionLimitedRelatedProducts = getLimitedRelatedProducts(
          collectionRelatedProducts,
          updatedAt
        )

        const {path} = getCollectionStructure(title)

        createPage<ProductPageContext>({
          path: `${path}/products/${handle}`,
          component: template,
          context: {
            skipJaenPage: true,
            productId: id,
            relatedProductIds: collectionLimitedRelatedProducts
          }
        })
      }

      relatedProducts.push(...collectionRelatedProducts)
    }

    const limitedRelatedProducts = getLimitedRelatedProducts(
      relatedProducts,
      updatedAt
    )

    console.log(`Creating product page for ${handle}`)

    createPage<ProductPageContext>({
      path: `/products/${handle}`,
      component: template,
      context: {
        skipJaenPage: true,
        productId: id,
        relatedProductIds: limitedRelatedProducts
      }
    })
  }

  reporter.success(`Created ${allShopifyProduct.totalCount} product pages`)
}
