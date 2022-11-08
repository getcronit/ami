import {Actions, Reporter} from 'gatsby'
import {ColllectionPageContext, ShopifyCollection} from '../types'
import {
  getCollectionStructure,
  isCollectionSubCollection
} from '../utils/collection'
import {getLimitedRelatedProducts} from '../utils/products'
import {slugify} from '../utils/slugify'
import {validateCollection} from './validate-collection'

interface BasicCollection {
  updatedAt: string
  id: string
  title: string
  products: Array<{
    id: string
    featuredMedia?: {
      preview: {
        image: {
          src: string
        }
      }
    }
  }>
}

const buildShopifyCollection = (
  collection: BasicCollection
): ShopifyCollection => {
  const {type, structName} = getCollectionStructure(collection.title)

  if (!type || !structName) {
    throw new Error(
      `Collection with ID ${collection.id} has an invalid handle: ${collection.title}`
    )
  }

  return {
    title: collection.title,
    handle: slugify(collection.title),
    productsCount: collection.products.length,
    description: '',
    collageImages: collection.products.map(
      product => product.featuredMedia?.preview.image.src ?? ''
    ),
    image: null
  }
}

interface CreateCollectionPages {
  createPage: Actions['createPage']
  createRedirect: Actions['createRedirect']
  reporter: Reporter
  data: {
    collections: BasicCollection[]
    template: string
  }
}

export const createCollectionPages = async ({
  createPage,
  createRedirect,
  reporter,
  data
}: CreateCollectionPages) => {
  const {collections, template} = data

  reporter.info(`Creating pages for ${collections.length} collections`)

  for (const collection of collections) {
    const isValid = await validateCollection({
      reporter,
      data: {
        id: collection.id,
        title: collection.title
      }
    })

    if (isValid) {
      const {path} = getCollectionStructure(collection.title)

      const collectionPagePath = path

      const subCollections = collections.filter(subCollection =>
        isCollectionSubCollection(collection.title, subCollection.title)
      )

      if (subCollections.length > 0) {
        const relatedProducts = collection.products.map(({id}) => id)
        const limitedRelatedProducts = getLimitedRelatedProducts(
          relatedProducts,
          collection.updatedAt
        )

        createPage<ColllectionPageContext>({
          path: collectionPagePath,
          component: template,
          context: {
            skipJaenPage: true,
            collectionId: collection.id,
            shopifyCollection: buildShopifyCollection(collection),
            subCollectionIds: subCollections.map(sub => sub.id),
            shopifySubCollections: {
              nodes: subCollections.map(buildShopifyCollection)
            },
            relatedProductIds: limitedRelatedProducts
          }
        })
      } else {
        createRedirect({
          fromPath: collectionPagePath,
          toPath: `${collectionPagePath}/products`,
          redirectInBrowser: true
        })

        createRedirect({
          fromPath: `${collectionPagePath}/`,
          toPath: `${collectionPagePath}/products`,
          redirectInBrowser: true
        })

        reporter.info(
          `Redirecting ${collectionPagePath} to ${collectionPagePath}/products because there are no sub collections`
        )
      }
    }

    reporter.success(`Created ${collections.length} collection pages`)
  }
}
