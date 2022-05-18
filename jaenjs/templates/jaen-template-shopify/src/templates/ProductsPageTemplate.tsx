import {SEO} from '@jaenjs/jaen'
import {
  getCollectionStructure,
  ProductsPageContext,
  ProductsPageData,
  SearchProvider,
  useProductSearch
} from '@snek-at/gatsby-theme-shopify'
import {graphql, PageProps} from 'gatsby'
import React from 'react'
import {Layout} from '../components/Layout'
import {ProductsTemplate} from '../components/templates'

const ProductsPageTemplate = (
  props: PageProps<ProductsPageData, ProductsPageContext>
) => {
  const {
    implicitTags,
    tags,
    maxPrice,
    minPrice,
    vendors,
    productTypes
  } = props.pageContext

  const [filters, setFilters] = React.useState<{
    tags?: string[]
    vendors?: string[]
    productTypes?: string[]
    maxPrice?: number
    minPrice?: number
  }>({
    tags: [],
    vendors: [],
    productTypes: []
  })

  const [sortKey, setSortKey] = React.useState<string | undefined>(undefined)
  const [reverse, setReverse] = React.useState<boolean | undefined>(undefined)

  const search = useProductSearch({
    sortKey,
    reverse,
    filters: {
      mainTag: implicitTags.length > 0 ? implicitTags[0] : undefined,
      tags: filters.tags,
      vendors: filters.vendors,
      productTypes: filters.productTypes,
      maxPrice: filters.maxPrice,
      minPrice: filters.minPrice
    }
  })

  const updateFilters = (newFilters: typeof filters) => {
    setFilters({
      ...filters,
      ...newFilters
    })
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
  }

  const buildProductsPageMeta = () => {
    const collection = props.data.collection

    let title = 'Sortiment'
    let description =
      'Unser Sortiment' +
      ' | Hersteller: ' +
      vendors.join(', ') +
      ' | Produkttypen: ' +
      productTypes.join(', ') +
      ' | Tags: ' +
      tags.join(', ')

    if (collection) {
      const struct = getCollectionStructure(collection.title)

      if (struct.name) {
        title = struct.name
        description +=
          ' | Kategorie: ' +
          title +
          ' | Beschreibung: ' +
          collection.description
      }
    }

    return {
      title,
      description,
      image: collection?.image?.src
    }
  }

  return (
    <>
      <SEO pagePath={props.path} pageMeta={buildProductsPageMeta()} />
      <Layout path={props.path}>
        <ProductsTemplate
          path={props.path}
          collection={props.data.collection}
          products={search.products}
          implicitTags={implicitTags}
          tags={tags}
          vendors={vendors}
          productTypes={productTypes}
          isFetching={search.isFetching}
          fetchNextPage={search.fetchNextPage}
          updateFilter={updateFilters}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sortOptions={[
            'Alphabetisch',
            'Preis aufsteigend',
            'Preis absteigend'
          ]}
          onSortChange={onSortChange}
        />
      </Layout>
    </>
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

export const query = graphql`
  query($collectionId: String) {
    shopifyCollection(id: {eq: $collectionId}) {
      ...shopifyCollectionData
    }
  }
`
