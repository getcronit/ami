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
        <Box width={500} height={500}>
          <Field.Image
            name="image"
            defaultValue={
              'https://www.rollingstone.com/wp-content/uploads/2018/06/emilia-clarke-61e260e9-daef-4fb0-9c91-05fcdadd680a.jpg'
            }
          />
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
    <>
      <Field.Text name="email" defaultValue={'test@test.com'} />
      <Field.Section
        name="cardSection"
        displayName="Card section"
        sections={[CardSection]}
      />
    </>
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
          sections {
            ...JaenSectionFields
            items {
              ...JaenSectionItemFields
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
