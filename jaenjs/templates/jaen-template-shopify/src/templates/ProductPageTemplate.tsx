import {graphql, PageProps} from 'gatsby'
import React from 'react'

import {
  ProductPageContext,
  ProductPageData,
  getFormattedProductPrices,
  getProductTags
} from '@snek-at/gatsby-theme-shopify'
import {ProductPage} from '../components/pages'
import {Layout} from '../components/Layout'
import {BreadcrumbsBanner} from '../components/BreadcrumbsBanner'
import {useWishlist} from '../services/wishlist'

const ProductPageTemplate = (
  props: PageProps<ProductPageData, ProductPageContext>
) => {
  const {shopifyProduct, relatedProducts} = props.data

  const {wishlist, addToWishlist, removeFromWishlist} = useWishlist()

  const isOnWishList = wishlist.some(item => item.id === shopifyProduct.id)

  console.log(`isOnWishList: ${isOnWishList}`)

  const handleWishlistAdd = (id: string) => {
    if (!isOnWishList) {
      const {priceFormatted, compareAtPriceFormatted} =
        getFormattedProductPrices(shopifyProduct)

      const tags = getProductTags(shopifyProduct)

      addToWishlist({
        id,
        handle: shopifyProduct.handle,
        title: shopifyProduct.title,
        price: priceFormatted,
        compareAtPrice: compareAtPriceFormatted,
        image: shopifyProduct.featuredMedia.image,
        categoriesString: tags.categoryString,
        tagsString: tags.otherString,
        quantity: 1
      })
    } else {
      removeFromWishlist(id)
    }
  }

  return (
    <Layout path={props.path}>
      <ProductPage
        path={props.path}
        shopifyProduct={props.data.shopifyProduct}
        relatedProducts={props.data.relatedProducts}
        onWishlistAdd={handleWishlistAdd}
        isOnWishList={isOnWishList}
      />
    </Layout>
  )
}

export const query = graphql`
  query ($productId: String!, $relatedProductIds: [String!]!) {
    relatedProducts: allShopifyProduct(filter: {id: {in: $relatedProductIds}}) {
      nodes {
        ...shopifyProductData
      }
    }
    shopifyProduct(id: {eq: $productId}) {
      ...shopifyProductData
    }
  }
`

export default ProductPageTemplate
