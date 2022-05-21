import {
  buildProductSearchQuery,
  ProductSearchFilters,
  transformProductSearchResultData
} from './helper'
import React from 'react'
import {useQuery, Provider} from 'urql'
import queryString from 'query-string'
import {StorefrontProductsQuery} from './queries'
import {NodeArray, ShopifyProduct} from '../types'
import {StorefrontSearchData} from './types'

interface UseProductSearchArgs {
  filters: ProductSearchFilters
  sortKey?: string
  reverse?: boolean
  count?: number
}

interface UseProductSearchResult {
  products: ShopifyProduct[]
  isFetching: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
  resetCursor: () => void
}

// Kategorie:Waffen AND ((Kategorie:Waffen:Pistole OR Kategorie:Waffen:Revolver) AND (Kaliber:5.56mm OR Kaliber:9mm OR Kaliber:12g))
export const useProductSearch = ({
  filters,
  sortKey,
  reverse = false,
  count = 10
}: UseProductSearchArgs): UseProductSearchResult => {
  const [serachQueryString, setSearchQueryString] = React.useState(
    buildProductSearchQuery(filters)
  )

  const [cursors, setCursors] = React.useState<{
    before: string | null
    after: string | null
  }>({
    before: null,
    after: null
  })

  const {searchTerm, tags, vendors, productTypes, minPrice, maxPrice} = filters

  // Relevance is non-deterministic if there is no query, so we default to "title" instead
  const initialSortKey = searchTerm ? 'RELEVANCE' : 'TITLE'

  const [result] = useQuery<StorefrontSearchData>({
    query: StorefrontProductsQuery,
    variables: {
      query: serachQueryString,
      sortKey: sortKey || initialSortKey,
      first: !cursors.before ? count : null,
      last: cursors.before ? count : null,
      after: cursors.after,
      before: cursors.before,
      reverse: reverse
    },
    pause: false
  })

  React.useEffect(() => {
    const qs = queryString.stringify({
      // Don't show if falsy
      q: searchTerm || undefined,
      x: maxPrice || undefined,
      n: minPrice || undefined,
      // Don't show if sort order is default
      s: sortKey === initialSortKey ? undefined : sortKey,
      // Don't show if all values are selected
      t: tags,
      v: vendors,
      p: productTypes,
      c: cursors.after || undefined
    })

    const url = new URL(window.location.href)
    url.search = qs
    url.hash = ''

    //window.history.replaceState({}, '', url.toString())
    setSearchQueryString(buildProductSearchQuery(filters))
  }, [filters, cursors, sortKey])

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

  const resetCursor = () => {
    setProducts([])
    setCursors({
      before: null,
      after: null
    })
  }

  const [products, setProducts] = React.useState<ShopifyProduct[]>([])

  React.useEffect(() => {
    resetCursor()
  }, [
    searchTerm,
    tags,
    vendors,
    productTypes,
    minPrice,
    maxPrice,
    sortKey,
    reverse
  ])

  React.useEffect(() => {
    if (result?.data?.products?.edges) {
      const transformedProducts = transformProductSearchResultData(
        result.data
      ).nodes

      setProducts(prevProducts => {
        return [...prevProducts, ...transformedProducts]
      })
    }
  }, [result.data?.products.edges])

  return {
    products,
    isFetching,
    hasNextPage,
    fetchNextPage,
    resetCursor
  }
}
