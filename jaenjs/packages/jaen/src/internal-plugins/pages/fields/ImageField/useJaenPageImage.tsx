import {getImage, IGatsbyImageData} from 'gatsby-plugin-image'
import {useJaenPageContext} from '../../internal/services/page'
import {useJaenSectionContext} from '../../internal/services/section'
import {findSection} from '../../utils'

export function useJaenPageImage(options: {
  id: string
  byFieldName?: string
}): IGatsbyImageData | undefined {
  const {id, byFieldName} = options

  const {jaenPage} = useJaenPageContext()
  const sectionContext = useJaenSectionContext()

  let file

  if (sectionContext) {
    const section = findSection(jaenPage.sections || [], sectionContext.path)

    const item = section?.items.find(({id}) => id === sectionContext.id)

    console.log('useJaenPageImage item', item)

    if (item) {
      if (byFieldName) {
        file = item[byFieldName]
      }

      if (!file) {
        file = item.jaenFiles.find(file => file.id === id)
      }
    }
  } else {
    if (byFieldName) {
      file = jaenPage[byFieldName]
    }

    if (!file) {
      file = jaenPage?.jaenFiles?.find(file => file.id === id)
    }
  }

  console.log('file', file)

  if (file) {
    return getImage(file.childImageSharp.gatsbyImageData)
  }
}
