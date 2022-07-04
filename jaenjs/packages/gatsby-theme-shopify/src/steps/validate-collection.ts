import {Reporter} from 'gatsby'
import {getCollectionStructure} from '../utils/collection'

interface ValidateCollection {
  reporter: Reporter
  data: {
    id?: string
    title: string
    handle?: string
  }
}

export const validateCollection = async ({
  reporter,
  data: {id, title, handle}
}: ValidateCollection) => {
  const {type, structName} = getCollectionStructure(title)

  if (!type || !structName) {
    reporter.warn(`Collection with ID ${id} has an invalid handle: ${handle}`)

    return false
  }

  return true

  // if (type.length > 5) {
  //   reporter.warn(
  //     `Collection with ID ${id} has a type of ${type.length} characters. This is longer than the maximum of 5. Skipping.`
  //   )

  //   return false
  // }

  // return true
}
