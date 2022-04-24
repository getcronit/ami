import {RELATED_PRODUCTS_LIMIT} from '../constants'
import {ShopifyProduct} from '../types'
import {getCollectionStructure} from './collection'
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
  const {price, compareAtPrice} = product.variants[0]

  const discount =
    compareAtPrice && compareAtPrice > price
      ? ((compareAtPrice - price) * 100) / compareAtPrice
      : null

  const priceFormatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(price)

  const compareAtPriceFormatted = compareAtPrice
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      }).format(compareAtPrice)
    : null

  const discountFormatted = discount ? `${discount.toFixed(0)}%` : null

  return {
    priceFormatted,
    compareAtPriceFormatted,
    discountFormatted
  }
}

export const getProductTags = (product: ShopifyProduct) => {
  const categoryTags = product.tags.filter(tag => tag.startsWith('Kategorie:'))
  const otherTags = product.tags.filter(tag => !tag.startsWith('Kategorie:'))

  let categoryString = ''

  if (categoryTags.length === 1) {
    categoryString = `Kategorie: ${
      getCollectionStructure(categoryTags[0]).name
    }`
  } else if (categoryTags.length > 1) {
    categoryString = `Kategorien: ${categoryTags
      .map(tag => getCollectionStructure(tag).name)
      .join(', ')}`
  }

  let otherString = ''

  if (otherTags.length === 1) {
    // check if the tag includes a colon
    if (otherTags[0].includes(':')) {
      const [type, ...rest] = otherTags[0].split(':')

      otherString = `${type}: ${rest.join(':')}`
    } else {
      otherString = otherTags[0]
    }
  } else if (otherTags.length > 1) {
    otherString = `${otherTags
      .map(tag => {
        if (tag.includes(':')) {
          const [type, ...rest] = tag.split(':')

          return `${type}: ${rest.join(':')}`
        } else {
          return tag
        }
      })
      .join(', ')}`
  }

  return {
    categoryTags,
    otherTags,
    categoryString,
    otherString
  }
}
