import {
  ProductsPageContext,
  ProductsPageData,
  SearchProvider,
  useProductSearch
} from '@snek-at/gatsby-theme-shopify'
import {PageProps} from 'gatsby'
import React from 'react'
import {Layout} from '../components/Layout'
import {ProductsPage} from '../components/pages'

const ProductsPageTemplate = (
  props: PageProps<ProductsPageData, ProductsPageContext>
) => {
  const {implicitTags, tags, maxPrice, minPrice} = props.pageContext

  const search = useProductSearch({
    filters: {
      mainTag: implicitTags.length > 0 ? implicitTags[0] : undefined,
      tags: tags,
      maxPrice,
      minPrice
    }
  })

  console.log(`search`, search)

  return (
    <Layout>
      <ProductsPage
        products={search.products.nodes}
        implicitTags={implicitTags}
        tags={tags}
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
