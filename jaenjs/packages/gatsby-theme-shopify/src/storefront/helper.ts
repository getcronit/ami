import {getShopifyImage} from 'gatsby-source-shopify'
import queryString from 'query-string'

import {NodeArray, ShopifyProduct} from '../types'
import {StorefrontSearchData} from './types'

const appendToQuery = (query: string, value: string, key?: 'AND' | 'OR') => {
  if (query.length > 0) {
    if (key) {
      query += ` ${key} `
    } else {
      query += ' '
    }
  }
  query += value
  return query
}

export interface ProductSearchFilters {
  mainTag?: string
  tags?: string[]
  vendors?: string[]
  productTypes?: string[]
  searchTerm?: string
  minPrice?: number
  maxPrice?: number
}

export const buildProductSearchQuery = (filters: ProductSearchFilters) => {
  const processedTags: {
    grouped: {[key: string]: string[]}
    ungrouped: string[]
  } = {grouped: {}, ungrouped: []}

  let query = ''

  if (filters.searchTerm) {
    query = appendToQuery(query, filters.searchTerm)
  }

  if (filters.mainTag) {
    query = appendToQuery(
      query,
      `tag:${JSON.stringify(filters.mainTag)}`,
      'AND'
    )
  }

  if (filters.tags) {
    const delimiter = ':'

    for (const tag of filters.tags) {
      if (tag.includes(delimiter)) {
        const [group, ...restParts] = tag.split(delimiter)
        const value = restParts.join(delimiter)
        if (!processedTags.grouped[group]) {
          processedTags.grouped[group] = []
        }

        processedTags.grouped[group].push(value)
      } else {
        processedTags.ungrouped.push(tag)
      }
    }

    const groupedEntries = Object.entries(processedTags.grouped)
    if (groupedEntries.length > 0) {
      query = appendToQuery(
        query,
        `(${groupedEntries
          .map(
            ([groupName, groupValues]) =>
              `(${groupValues
                .map(
                  value =>
                    `tag:${JSON.stringify(`${groupName}${delimiter}${value}`)}`
                )
                .join(' OR ')})`
          )
          .join(' AND ')})`,
        'AND'
      )
    }

    if (processedTags.ungrouped.length > 0) {
      query = appendToQuery(
        query,
        `(${processedTags.ungrouped
          .map(tag => `tag:${JSON.stringify(tag)}`)
          .join(' OR ')})`,
        'AND'
      )
    }
  }

  if (filters.vendors) {
    query = appendToQuery(
      query,
      `(${filters.vendors
        .map(vendor => `vendor:${JSON.stringify(vendor)}`)
        .join(' OR ')})`,
      'AND'
    )
  }

  if (filters.productTypes) {
    query = appendToQuery(
      query,
      `(${filters.productTypes
        .map(productType => `product_type:${JSON.stringify(productType)}`)
        .join(' OR ')})`,
      'AND'
    )
  }

  if (filters.minPrice) {
    query = appendToQuery(
      query,
      `variants.price:>=${JSON.stringify(filters.minPrice.toString())}`
    )
  }

  if (filters.maxPrice) {
    query = appendToQuery(
      query,
      `variants.price:<=${JSON.stringify(filters.maxPrice.toString())}`
    )
  }

  return query
}

function arrayify(value: any) {
  if (!value) {
    return []
  }
  if (!Array.isArray(value)) {
    return [value]
  }
  return value
}

/**
 * Extracts default search values from the query string or object
 * @param {string|object} query
 */
export function getValuesFromQuery(query: string | object) {
  const isClient = typeof query === 'string'
  const {
    q: searchTerm,
    s: sortKey,
    x: maxPrice,
    n: minPrice,
    p,
    t,
    v
  } = isClient ? (queryString.parse(query) as any) : (query as any)
  return {
    searchTerm,
    sortKey,
    maxPrice,
    minPrice,
    productTypes: arrayify(p),
    tags: arrayify(t),
    vendors: arrayify(v)
  }
}

export const transformProductSearchResultData = (
  data?: StorefrontSearchData
): NodeArray<ShopifyProduct> => {
  return {
    nodes:
      data?.products?.edges?.map(edge => {
        return {
          variants: edge.node.variants.nodes.map(variant => {
            return {
              id: variant.id,
              taxable: true,
              sku: variant.sku,
              price: variant.price ? parseInt(variant.price) : Infinity,
              compareAtPrice: variant.compareAtPrice
                ? parseInt(variant.compareAtPrice)
                : null
            }
          }),
          hasOnlyDefaultVariant: undefined,
          id: edge.node.id,
          description: edge.node.description,
          descriptionHtml: edge.node.descriptionHtml,
          handle: edge.node.handle,
          title: edge.node.title,
          tags: edge.node.tags,
          status: undefined,
          totalInventory: edge.node.totalInventory,
          createdAt: edge.node.createdAt,
          vendor: edge.node.vendor,
          productType: edge.node.productType,
          media: edge.node.images.edges
            .map(imageEdge => {
              return {
                id: imageEdge.node.id,
                image: {
                  gatsbyImageData: getShopifyImage({
                    image: {
                      ...imageEdge.node,
                      originalSrc: imageEdge.node.url
                    }
                  }),
                  altText: imageEdge.node.altText || edge.node.title
                }
              }
            })
            .filter(image => image.id !== edge.node.featuredImage?.id),
          featuredMedia: edge.node.featuredImage
            ? {
                id: edge.node.featuredImage.id,
                image: {
                  gatsbyImageData: getShopifyImage({
                    image: {
                      ...edge.node.featuredImage,
                      originalSrc: edge.node.featuredImage.url
                    }
                  }),
                  altText: edge.node.featuredImage.altText || edge.node.title
                }
              }
            : null,
          metafields: []
        }
      }) || []
  }
}
