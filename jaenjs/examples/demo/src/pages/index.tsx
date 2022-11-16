import {Box, Button} from '@chakra-ui/react'
import {connectPage, connectSection, Field, navigate} from '@jaenjs/jaen'
import {graphql} from 'gatsby'

console.log('HAS_REACT_18', HAS_REACT_18)

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

const IndexPage = () => {
  return (
    <Box pt={2000}>
      <Button onClick={() => navigate('test')}>CLICK ME</Button>
      <Field.Text rtf name="email" defaultValue={'test@test.com'} />
      <Field.Section
        name="cardSection"
        displayName="Card section"
        sections={[CardSection]}
      />
      <Box w="20%" h="80%" minW="200px" minH="200px" backgroundColor="aqua">
        <Field.Image name="image" defaultValue={undefined} />
      </Box>
    </Box>
  )
}

export default connectPage(IndexPage, {
  displayName: 'Index Page'
})

export const query = graphql`
  query($jaenPageId: String!) {
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
