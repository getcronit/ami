import {slugify} from './slugify'

export const getCollectionStructure = (collectionTitle: string) => {
  const parts = collectionTitle.split(':')

  let type, structName, name, path

  if (parts.length > 1) {
    type = parts[0]

    parts.shift()

    structName = parts.join(':')
    name = parts.slice(-1)[0]
    path = parts.map(slugify).join('/')
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
  const {type, structName} = getCollectionStructure(collectionTitle)

  const {type: subType, structName: subStructName} =
    getCollectionStructure(subCollectionTitle)

  if (type!.length + 1 === subType!.length) {
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

  return false
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
