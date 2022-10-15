import {IGatsbyImageData} from 'gatsby-plugin-image'

export interface NodeArray<T> {
  nodes: T[]
}

export interface ShopifyGeneratorProductQueryData {
  allShopifyProduct: {
    tags: string[]
    vendors: Array<string>
    productTypes: Array<string>
    totalCount: number
    maxPrice: number
    minPrice: number
    nodes: Array<{
      id: string
      shopifyId: string
      handle: string
      updatedAt: string
      featuredMedia: {
        preview: {
          image: {
            src: string
          }
        }
      }
      variants: Array<{
        price: number
      }>
      tags: string[]
      vendor: string
      productType: string
      collections?: Array<{
        title: string
        products: Array<{
          id: string
        }>
      }>
    }>
    allProductIds: Array<string>
  }
}

export interface ShopifyGeneratorCollectionQueryData {
  allShopifyCollection: {
    totalCount: number
    nodes: Array<{
      id: string
      title: string
      handle: string
      updatedAt: string
      products: Array<{
        id: string
        featuredMedia: {
          preview: {
            image: {
              src: string
            }
          }
        }
        variants: Array<{
          price: number
        }>
        tags: string[]
        vendor: string
        productType: string
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
  maxPrice: number | null
  minPrice: number | null
  implicitTags: Array<string>
  tags: Array<string>
  vendors: Array<string>
  productTypes: Array<string>
  collectionId?: string
  totalProductsPerPage?: number
}

export interface ColllectionPageContext extends ExcludeJaenPage {
  collectionId: string
  shopifyCollection: ShopifyCollection
  subCollectionIds: Array<string>
  shopifySubCollections: NodeArray<{
    title: string
    handle: string
    productsCount: number
    description: string
    image: {
      src: string
      gatsbyImageData?: IGatsbyImageData
      altText: string | null
    } | null
    collageImages?: string[]
  }>
  relatedProductIds: Array<string>
}

export interface ShopifyProduct {
  variants: Array<{
    id: string
    shopifyId: string
    taxable: boolean
    sku: string
    compareAtPrice: number | null
    price: number
    availableForSale: boolean
  }>
  hasOnlyDefaultVariant?: boolean
  id: string
  shopifyId: string
  handle: string
  description: string
  descriptionHtml: string
  title: string
  tags: Array<string>
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT'
  totalInventory: number | null
  createdAt: string
  vendor: string
  productType: string
  media: Array<{
    id: string
    image: {
      gatsbyImageData: IGatsbyImageData
      altText: string | null
    }
  }>
  featuredMedia: {
    id: string
    image: {
      gatsbyImageData: IGatsbyImageData
      altText: string | null
    }
  } | null
  metafields: Array<{
    key: string
    value: string
    namespace: string
  }>
}

export interface ShopifyCollection {
  title: string
  handle: string
  productsCount: number
  description: string
  image: {
    src: string
    gatsbyImageData?: IGatsbyImageData
    altText: string | null
  } | null
  collageImages?: string[]
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

export interface ProductsPageData {
  collection: ShopifyCollection | null
}
