import {slugify} from './slugify'

export const getCollectionStructure = (
  collectionTitle: string,
  parentCollentionTitle?: string
) => {
  const parts = collectionTitle.split(':')

  let type, structName, name
  let path = '#'

  if (parts.length > 1) {
    type = parts[0]

    parts.shift()

    structName = parts.join(':')
    name = parts.slice(-1)[0]
    path = `/collections/${parts.map(slugify).join('/')}`

    if (parentCollentionTitle) {
      const {structName: parentStructName} = getCollectionStructure(
        parentCollentionTitle
      )

      if (parentStructName && !structName.startsWith(parentStructName)) {
        name = parts[0]
      }
    }
  }

  return {
    type,
    structName,
    name,
    path
  }
}

export const collectionTitleToPath = (collectionTitle: string) => {
  const {path} = getCollectionStructure(collectionTitle)

  return path
}

export const isCollectionSubCollection = (
  collectionTitle: string,
  subCollectionTitle: string
) => {
  const {structName} = getCollectionStructure(collectionTitle)

  const {structName: subStructName} = getCollectionStructure(subCollectionTitle)

  if (subStructName === structName) {
    return false
  }

  // matches cases like:
  // - A:Waffen and AB:Waffen:Eisen
  // - AB:Waffen:Eisen and ABC:Waffen:Eisen:Langschwert
  // - ABC:Waffen:Eisen:Langschwert and ABCD:Waffen:Eisen:Langschwert:Alt
  //
  // cases like B:Repetiergewehre and AB:Waffen:Repetiergewehre are not checked
  const include = subStructName!.startsWith(structName!)

  if (include) {
    return true
  }

  // check if the unmatched former case applies if not already included
  const {structName: crossSubStructName} = getCollectionStructure(
    subStructName!
  )

  return crossSubStructName === structName
}

export const filterCollectionRelevantTags = (
  tags: Array<string>,
  collectionTile: string
) => {
  const filteredTags: Array<string> = []

  for (const tag of tags) {
    if (tag.startsWith('Kategorie:')) {
      if (!isCollectionSubCollection(collectionTile, tag)) {
        continue
      }
    }

    filteredTags.push(tag)
  }

  return filteredTags
}

export const cleanVendors = (vendors: Array<string>) => {
  return vendors.filter(vendor => vendor !== '-')
}

export const cleanProductTypes = (productTypes: Array<string>) => {
  return productTypes.filter(productType => productType && productType !== '-')
}
