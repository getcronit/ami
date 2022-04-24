import {
  ProductsPageContext,
  ProductsPageData,
  SearchProvider,
  useProductSearch
} from '@snek-at/gatsby-theme-shopify'
import {PageProps} from 'gatsby'
import React from 'react'
import {Layout} from '../components/Layout'
import {ProductsTemplate} from '../components/templates'

const ProductsPageTemplate = (
  props: PageProps<ProductsPageData, ProductsPageContext>
) => {
  const {implicitTags, tags, maxPrice, minPrice} = props.pageContext

  const [filters, setFilters] = React.useState<{
    tags?: string[]
    maxPrice?: number
    minPrice?: number
  }>({
    tags: []
  })

  const [sortKey, setSortKey] = React.useState<string | undefined>(undefined)
  const [reverse, setReverse] = React.useState<boolean | undefined>(undefined)

  const search = useProductSearch({
    sortKey,
    reverse,
    filters: {
      mainTag: implicitTags.length > 0 ? implicitTags[0] : undefined,
      tags: filters.tags,
      maxPrice: filters.maxPrice,
      minPrice: filters.minPrice
    }
  })

  const updateFilters = (newFilters: typeof filters) => {
    setFilters({
      ...filters,
      ...newFilters
    })

    search.resetCursor()
  }

  const onSortChange = (sort: string) => {
    let sortOption

    switch (sort) {
      case 'Alphabetisch':
        sortOption = 'TITLE'
        setReverse(false)
        break
      case 'Preis aufsteigend':
        sortOption = 'PRICE'
        setReverse(false)
        break
      case 'Preis absteigend':
        sortOption = 'PRICE'
        setReverse(true)
        break
      default:
        sortOption = 'TITLE'
        setReverse(false)
    }

    setSortKey(sortOption)
    search.resetCursor()
  }

  return (
    <Layout path={props.path}>
      <ProductsTemplate
        path={props.path}
        products={search.products}
        implicitTags={implicitTags}
        tags={tags}
        isFetching={search.isFetching}
        fetchNextPage={search.fetchNextPage}
        updateFilter={updateFilters}
        minPrice={minPrice}
        maxPrice={maxPrice}
        sortOptions={['Alphabetisch', 'Preis aufsteigend', 'Preis absteigend']}
        onSortChange={onSortChange}
      />
    </Layout>
  )
}

export default (
  props: JSX.IntrinsicAttributes &
    PageProps<ProductsPageData, ProductsPageContext, unknown, object>
) => (
  <SearchProvider>
    <ProductsPageTemplate {...props} />
  </SearchProvider>
)
