import {Actions, Reporter} from 'gatsby'
import {RELATED_PRODUCTS_LIMIT} from '../constants'
import {ProductPageContext, ShopifyPageGeneratorQueryData} from '../types'
import {getLimitedRelatedProducts} from '../utils/products'
import {getPseudoRandom} from '../utils/pseudoRandom'

interface CreateProductPages {
  createPage: Actions['createPage']
  reporter: Reporter
  data: {
    allShopifyProduct: ShopifyPageGeneratorQueryData['allShopifyProduct']
    template: string
  }
}

export const createProductPages = async ({
  createPage,
  reporter,
  data
}: CreateProductPages) => {
  const {allShopifyProduct, template} = data

  for (const {id, handle, updatedAt, collections} of allShopifyProduct.nodes) {
    const relatedProducts: Array<string> = []

    // merge products from collections
    for (const {products} of collections) {
      for (const product of products) {
        if (product.id === id) {
          continue
        }

        relatedProducts.push(product.id)
      }
    }

    const limitedRelatedProducts = getLimitedRelatedProducts(
      relatedProducts,
      updatedAt
    )

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
