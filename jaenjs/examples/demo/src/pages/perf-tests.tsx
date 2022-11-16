import {
  Box,
  ChakraProvider,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react'
import {connectPage, connectSection, Field} from '@jaenjs/jaen'
import {graphql} from 'gatsby'
import React from 'react'

const MySection = connectSection(
  () => {
    return (
      <Box>
        <Field.Text name="test" defaultValue={'Notzing to show'} />
      </Box>
    )
  },
  {
    name: 'MySection',
    displayName: 'My Section'
  }
)

const PerfTestPage = () => {
  const [textCount, setTextCount] = React.useState(0)
  const [imageCount, setImageCount] = React.useState(0)

  return (
    <ChakraProvider>
      <Box>
        <h1>Perf tests for Text</h1>

        <NumberInput
          onChange={valueString => setTextCount(Number(valueString))}
          value={textCount}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        {Array.from({length: textCount}).map((_, i) => (
          <Field.Text key={i} name={`text${i}`} defaultValue={`text${i}`} />
        ))}
      </Box>
      <Box>
        <h1>Perf tests for Images</h1>

        <NumberInput
          onChange={valueString => setImageCount(Number(valueString))}
          value={imageCount}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        {Array.from({length: imageCount}).map((_, i) => (
          <Field.Image
            key={i}
            name={`image${i}`}
            defaultValue={
              'data:image/jpeg;base64,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'
            }
          />
        ))}
      </Box>

      <Box>
        <h1>Perf tests for Nested Section Field with Text</h1>

        <Field.Section
          name="section"
          displayName="My Section Parent"
          sections={[MySection]}
        />
      </Box>
    </ChakraProvider>
  )
}

export default connectPage(PerfTestPage, {
  displayName: 'PerfTestPage'
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
