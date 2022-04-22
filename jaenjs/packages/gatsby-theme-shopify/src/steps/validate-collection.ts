import {Reporter} from 'gatsby'
import {ShopifyPageGeneratorQueryData} from '../types'
import {getCollectionStructure} from '../utils/collection'

interface ValidateCollection {
  reporter: Reporter
  data: {
    collection: ShopifyPageGeneratorQueryData['allShopifyCollection']['nodes'][number]
  }
}

export const validateCollection = async ({
  reporter,
  data: {collection}
}: ValidateCollection) => {
  const id = collection.id
  const handle = collection.handle
  const {type, structName} = getCollectionStructure(collection.title)

  if (!type || !structName) {
    reporter.warn(`Collection with ID ${id} has an invalid handle: ${handle}`)

    return false
  }

  if (type.length > 5) {
    reporter.warn(
      `Collection with ID ${id} has a type of ${type.length} characters. This is longer than the maximum of 5. Skipping.`
    )

    return false
  }

  return true
}
