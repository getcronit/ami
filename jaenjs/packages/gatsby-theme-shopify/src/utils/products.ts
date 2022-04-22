import {RELATED_PRODUCTS_LIMIT} from '../constants'
import {ShopifyProduct} from '../types'
import {getPseudoRandom} from './pseudoRandom'

export const getLimitedRelatedProducts = (
  productIds: Array<string>,
  seed: string
) => {
  const limitedRelatedProducts: Array<string> = []

  if (productIds.length < RELATED_PRODUCTS_LIMIT) {
    // if there are less than 12 products, use all products
    limitedRelatedProducts.push(...productIds)
  } else {
    const random = getPseudoRandom(new Date(seed).getTime())
    const randomIndex = Math.floor(random * productIds.length)

    // pick 12 products from the collection starting at the random index
    for (let i = 0; i < RELATED_PRODUCTS_LIMIT; i++) {
      const productIndex = (randomIndex + i) % productIds.length
      const productId = productIds[productIndex]

      limitedRelatedProducts.push(productId)
    }
  }

  return limitedRelatedProducts
}

export const getFormattedProductPrices = (
  product: ShopifyProduct,
  locale: string = 'de-DE',
  currency: string = 'EUR'
) => {
  const priceFormatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(product.variants[0].price)

  const compareAtPriceFormatted = product.variants[0].compareAtPrice
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      }).format(product.variants[0].compareAtPrice)
    : null

  return {
    priceFormatted,
    compareAtPriceFormatted
  }
}
