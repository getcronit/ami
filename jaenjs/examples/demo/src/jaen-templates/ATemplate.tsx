import {Button} from '@chakra-ui/react'
import {connectTemplate, navigate} from '@jaenjs/jaen'
import {graphql} from 'gatsby'

const ATemplate = () => {
  return (
    <>
      <Button onClick={() => navigate('dddd')}></Button>
    </>
  )
}

export default connectTemplate(ATemplate, {
  displayName: 'ATemplate',
  children: ['ATemplate'],
  isRootTemplate: true
})

export const query = graphql`
  query ($jaenPageId: String!) {
    jaenPage(id: {eq: $jaenPageId}) {
      id
      slug
      jaenFields
      jaenPageMetadata {
        title
        isBlogPost
        image
        description
        datePublished
        canonical
      }
      jaenFiles {
        id
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
      sections {
        ...JaenSectionFields
        items {
          ...JaenSectionItemFields
          image: jaenFile {
            id
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                height: 200
              )
            }
          }
          sections {
            ...JaenSectionFields
            items {
              ...JaenSectionItemFields
              image: jaenFile {
                id
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    height: 200
                  )
                }
              }
              sections {
                ...JaenSectionFields
                items {
                  ...JaenSectionItemFields
                  image: jaenFile {
                    id
                    childImageSharp {
                      gatsbyImageData(
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                        height: 200
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
