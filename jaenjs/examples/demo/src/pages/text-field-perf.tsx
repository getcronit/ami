import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack
} from '@chakra-ui/react'
import {connectPage, Field} from '@jaenjs/jaen'
import {graphql} from 'gatsby'
import React from 'react'

const Page = connectPage(
  () => {
    const [totalFields, setTotalFields] = React.useState(0)

    const handleChange = (_: string, value: number) => setTotalFields(value)

    const fields = React.useMemo(
      () =>
        Array.from({length: totalFields}).map((_, i) => (
          <Field.Text
            name={`field${i}`}
            defaultValue="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          />
        )),
      [totalFields]
    )

    return (
      <Box>
        <NumberInput
          maxW="100px"
          mr="2rem"
          value={totalFields}
          onChange={handleChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <VStack>{fields}</VStack>
      </Box>
    )
  },
  {
    displayName: 'Sample Page'
  }
)

export default Page

export const query = graphql`
  query($jaenPageId: String!) {
    ...JaenPageQuery
  }
`
