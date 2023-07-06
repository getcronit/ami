import queryString from 'query-string'
import React from 'react'
import {useQuery} from 'urql'
import {ShopifyProduct} from '../types'
import {removeEmpty} from '../utils/removeEmpty'
import {
  buildProductSearchQuery,
  getValuesFromQuery,
  ProductSearchFilters,
  transformProductSearchResultData
} from './helper'
import {StorefrontProductsQuery} from './queries'
import {StorefrontSearchData} from './types'

export interface ProductSearchCursor {
  before: string | null
  after: string | null
}

export interface ProductSearchQuery {
  filters: ProductSearchFilters
  options: {
    sortKey?: string
  }
}

export interface ProductSearchOptions {
  sortKey: string
  reverse: boolean
  count: number
}

export const useProductSearch = ({
  metafieldIdentifiers = [],
  persistData = true,
  ...props
}: {
  metafieldIdentifiers?: Array<{
    key: string
    namespace: string
  }>
  filters?: ProductSearchFilters
  options?: Partial<ProductSearchOptions>
  persistData?: boolean
}) => {
  const defaultQuery = React.useMemo<ProductSearchQuery>(() => {
    if (!persistData || typeof window === 'undefined') {
      return {
        filters: {},
        options: {}
      }
    }

    const values = getValuesFromQuery(new URL(window.location.href).search)

    // validate if values are valid

    if (values.maxPrice) {
      values.maxPrice = parseInt(values.maxPrice)
    }

    if (values.minPrice) {
      values.minPrice = parseInt(values.minPrice)
    }

    return {
      filters: removeEmpty({
        mainTag: values.mainTag,
        searchTerm: values.searchTerm,
        maxPrice: values.maxPrice,
        minPrice: values.minPrice,
        productTypes: values.productTypes,
        tags: values.tags,
        vendors: values.vendors
      }),
      options: removeEmpty({
        sortKey: values.sortKey
      })
    }
  }, [])

  const [filters, setFilters] = React.useState<ProductSearchFilters>({
    ...props.filters,
    ...defaultQuery.filters
  })

  const [options, setOptions] = React.useState<ProductSearchOptions>({
    sortKey:
      props.options?.sortKey ||
      defaultQuery.options.sortKey ||
      filters.searchTerm
        ? 'RELEVANCE'
        : 'TITLE',
    reverse: props.options?.reverse || false,
    count: props.options?.count !== undefined ? props.options.count : 10
  })

  const onChangeOptions = React.useCallback(
    (newOptions: Partial<ProductSearchOptions>) => {
      setOptions({
        ...options,
        ...newOptions
      })
    },
    [setOptions, options]
  )

  const onChangeFilter = React.useCallback(
    (newFilters: Partial<ProductSearchFilters>) => {
      setFilters({
        ...filters,
        ...newFilters
      })
    },
    [setFilters, filters]
  )

  const [cursors, setCursors] = React.useState<ProductSearchCursor>({
    before: null,
    after: null
  })

  const [query, setQuery] = React.useState(buildProductSearchQuery(filters))

  const updateQuery = React.useCallback(
    (newFilters: ProductSearchFilters) => {
      setQuery(buildProductSearchQuery(newFilters))
    },
    [setQuery]
  )

  const initialSortKey = filters.searchTerm ? 'RELEVANCE' : 'TITLE'

  React.useEffect(() => {
    const qs = queryString.stringify({
      // Don't show if falsy
      q: filters.searchTerm || undefined,
      x: filters.maxPrice || undefined,
      n: filters.minPrice || undefined,
      // Don't show if sort order is default
      s: options.sortKey === initialSortKey ? undefined : options.sortKey,
      // Don't show if all values are selected
      t: filters.tags,
      v: filters.vendors,
      p: filters.productTypes,
      c: cursors.after || undefined
    })

    updateQuery(filters)

    if (persistData) {
      const url = new URL(window.location.href)
      url.search = qs
      url.hash = ''

      window.history.replaceState({}, '', url.toString())
    }
  }, [filters, cursors, options.sortKey, options.reverse])

  const [result] = useQuery<StorefrontSearchData>({
    query: StorefrontProductsQuery,
    variables: {
      query,
      metafieldIdentifiers,
      sortKey: options.sortKey,
      first: !cursors.before ? options.count : null,
      last: cursors.before ? options.count : null,
      after: cursors.after,
      before: cursors.before,
      reverse: options.reverse
    },
    pause: false
  })

  const [products, setProducts] = React.useState<ShopifyProduct[]>([])

  React.useEffect(() => {
    setCursors({
      before: null,
      after: null
    })
    setProducts([])
  }, [filters, options.reverse, options.sortKey, options.count])

  React.useEffect(() => {
    if (result?.data?.products?.edges) {
      const transformedProducts = transformProductSearchResultData(result.data)
        .nodes

      setProducts(prevProducts => {
        return [...prevProducts, ...transformedProducts]
      })
    }
  }, [result.data?.products.edges])

  const isFetching = result?.fetching
  const hasNextPage = result?.data?.products?.pageInfo?.hasNextPage ?? false

  const fetchNextPage = () => {
    if (hasNextPage) {
      // when we go forward we want all products after the last one of our array
      const prods = result?.data?.products?.edges

      if (prods) {
        const prod = prods[prods.length - 1]

        if (prod) {
          const nextCursor = prod.cursor

          setCursors({
            before: null,
            after: nextCursor
          })
        }
      }
    }
  }

  const finalProducts = React.useMemo(() => {
    if (
      result.data &&
      result.data.products &&
      result.data.products.edges.length > 0 &&
      products.length === 0
    ) {
      return transformProductSearchResultData(result.data).nodes
    }

    return products
  }, [result.data, products])

  return {
    isFetching,
    hasNextPage,
    fetchNextPage,
    products: finalProducts,
    filters,
    options,
    onChangeFilter,
    onChangeOptions
  }
}
