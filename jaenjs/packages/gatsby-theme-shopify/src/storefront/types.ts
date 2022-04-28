export interface StorefrontSearchData {
  products: Products
}

export interface Products {
  pageInfo: PageInfo
  edges: ProductsEdge[]
  __typename: string
}

export interface ProductsEdge {
  cursor: string
  node: PurpleNode
  __typename: string
}

export interface PurpleNode {
  title: string
  handle: string
  descriptionHtml: string
  totalInventory: number
  createdAt: string
  variants: Variants
  id: string
  tags: string[]
  featuredImage: FeaturedImage | null
  images: Images
  __typename: string
}

export interface FeaturedImage {
  id: string
  url: string
  width: number
  height: number
  altText: string | null
  __typename: FeaturedImageTypename
}

export enum FeaturedImageTypename {
  Image = 'Image'
}

export interface Images {
  edges: ImagesEdge[]
  __typename: string
}

export interface ImagesEdge {
  node: FeaturedImage
  __typename: EdgeTypename
}

export enum EdgeTypename {
  ImageEdge = 'ImageEdge'
}

export interface Variants {
  nodes: NodeElement[]
  edges: VariantsEdge[]
  __typename: string
}

export interface VariantsEdge {
  node: FluffyNode
  __typename: string
}

export interface FluffyNode {
  id: string
  __typename: string
}

export interface NodeElement {
  price: string
  sku: string
  id: string
  compareAtPrice: null | string
  __typename: string
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  __typename: string
}
