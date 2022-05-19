import {
  Box,
  Heading,
  Progress,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import {SEO} from '../../internal-plugins/pages'
import {JaenLogo} from './icons'

export const AdminPageLoading = (props: {heading: string}) => {
  return (
    <>
      <SEO
        pageMeta={{
          title: 'Jaen Admin | Loading ...'
        }}
      />
      <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH="100vh"
        py="12"
        px={{base: '4', lg: '8'}}>
        <JaenLogo
          mx={'auto'}
          boxSize={'16'}
          display={'block'}
          mb={{base: '10', md: '15'}}
        />
        <Stack maxW="md" mx="auto" spacing={6}>
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            {props.heading}
          </Heading>
          <Progress size="xs" isIndeterminate colorScheme="teal" />
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Loading...</Text>
          </Text>
        </Stack>
      </Box>
    </>
  )
}

export default AdminPageLoading
