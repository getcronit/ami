import {Box} from '@chakra-ui/react'
import {connectPage, connectSection, Field} from '@jaenjs/jaen'
import {graphql} from 'gatsby'

const CardSection = connectSection(
  () => {
    return (
      <Box bg="gray.100" w="100%" p={4}>
        <Field.Text name="email" defaultValue={'test@test.com'} />
        <Field.Section
          name="biiiideeee"
          displayName="Card section"
          sections={[CardSection]}
        />
        <Box width={1000} height={100}>
          <Field.Image name="image" defaultValue={undefined} />
        </Box>
      </Box>
    )
  },
  {
    displayName: 'CardSection',
    name: 'CardSection'
  }
)

const BiddeCardSection = connectSection(
  () => {
    return (
      <Box bg="tomato" w="100%" p={4} color="white">
        <Field.Text name="email" defaultValue={'test@test.com'} />
      </Box>
    )
  },
  {
    displayName: 'BiddeCardSection',
    name: 'BiddeCardSection'
  }
)

const Index2Page = () => {
  return (
    <>
      <Field.Text name="email" defaultValue={'test@test.com'} />
      <Field.Section
        name="cardSection"
        displayName="Card section"
        sections={[CardSection]}
      />
      Index2
      <Field.Index
        renderPage={page => <>{page.id}</>}
        path={'/index2/asdasdasd'}
      />
    </>
  )
}

export default connectPage(Index2Page, {
  displayName: 'Inde2x Page',
  children: ['ATemplate']
})

export const query = graphql`
  query($jaenPageId: String!) {
    jaenPage(id: {eq: $jaenPageId}) {
      id
      slug
      jaenFields
      buildPath
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
