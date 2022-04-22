import {Actions, Reporter} from 'gatsby'
import {ColllectionPageContext, ShopifyPageGeneratorQueryData} from '../types'
import {
  getCollectionStructure,
  isCollectionSubCollection
} from '../utils/collection'
import {getLimitedRelatedProducts} from '../utils/products'
import {validateCollection} from './validate-collection'

interface CreateCollectionPages {
  createPage: Actions['createPage']
  createRedirect: Actions['createRedirect']
  reporter: Reporter
  data: {
    allShopifyCollection: ShopifyPageGeneratorQueryData['allShopifyCollection']
    template: string
  }
}

export const createCollectionPages = async ({
  createPage,
  createRedirect,
  reporter,
  data
}: CreateCollectionPages) => {
  const {allShopifyCollection, template} = data

  reporter.info(
    `Creating pages for ${allShopifyCollection.totalCount} collections`
  )

  for (const collection of allShopifyCollection.nodes) {
    const isValid = await validateCollection({
      reporter,
      data: {collection}
    })

    if (isValid) {
      const {path} = getCollectionStructure(collection.title)

      const collectionPagePath = `/collections/${path}`

      const subCollections = allShopifyCollection.nodes.filter(subCollection =>
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
            subCollectionIds: subCollections.map(sub => sub.id),
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

    reporter.success(
      `Created ${allShopifyCollection.totalCount} collection pages`
    )
  }
}
