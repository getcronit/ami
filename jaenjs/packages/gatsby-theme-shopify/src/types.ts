import {IGatsbyImageData} from 'gatsby-plugin-image'

export interface NodeArray<T> {
  nodes: T[]
}

export interface ShopifyPageGeneratorQueryData {
  allShopifyProduct: {
    tags: string[]
    totalCount: number
    maxPrice: number
    minPrice: number
    nodes: Array<{
      id: string
      handle: string
      updatedAt: string
      collections: Array<{
        products: Array<{
          id: string
        }>
      }>
    }>
    allProductIds: Array<string>
  }
  allShopifyCollection: {
    totalCount: number
    nodes: Array<{
      id: string
      title: string
      handle: string
      updatedAt: string
      products: Array<{
        id: string
        variants: Array<{
          price: number
        }>
        tags: string[]
      }>
    }>
  }
}

interface ExcludeJaenPage {
  skipJaenPage: true
}

export interface ProductPageContext extends ExcludeJaenPage {
  productId: string
  relatedProductIds: Array<string>
}

export interface ProductsPageContext extends ExcludeJaenPage {
  maxPrice: number
  minPrice: number
  implicitTags: Array<string>
  tags: Array<string>
  collectionId?: string
  totalProductsPerPage?: number
}

export interface ColllectionPageContext extends ExcludeJaenPage {
  collectionId: string
  subCollectionIds: Array<string>
  relatedProductIds: Array<string>
}

export interface ShopifyProduct {
  variants: Array<{
    id: string
    sku: string
    compareAtPrice: number | null
    price: number
  }>
  hasOnlyDefaultVariant?: boolean
  id: string
  handle: string
  descriptionHtml: string
  title: string
  tags: Array<string>
  status?: string
  totalInventory: number
  createdAt: string
  media: Array<{
    id: string
    image: {
      gatsbyImageData: IGatsbyImageData
      altText: string
    }
  }>
  featuredMedia: {
    id: string
    image: {
      gatsbyImageData: IGatsbyImageData
      altText: string
    }
  }
}

export interface ShopifyCollection {
  title: string
  handle: string
  productsCount: number
}

export interface ProductPageData {
  shopifyProduct: ShopifyProduct
  relatedProducts: NodeArray<ShopifyProduct>
}

export interface CollectionPageData {
  shopifyCollection: ShopifyCollection
  subCollections: NodeArray<ShopifyCollection>
  relatedProducts: NodeArray<ShopifyProduct>
}

export interface ProductsPageData {}