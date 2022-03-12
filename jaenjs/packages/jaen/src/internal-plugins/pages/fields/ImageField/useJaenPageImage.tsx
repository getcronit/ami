import {useJaenPageContext} from '../../internal/services/page'
import {getImage, IGatsbyImageData} from 'gatsby-plugin-image'

export function useJaenPageImage(options: {
  id: string
}): IGatsbyImageData | undefined {
  const {id} = options

  const {jaenPage} = useJaenPageContext()

  if (!jaenPage.jaenFiles) {
    return undefined
  }

  const file = jaenPage.jaenFiles.find(({file}) => file.id === id)?.file

  if (file) {
    return getImage(file.childImageSharp.gatsbyImageData)
  }
}
