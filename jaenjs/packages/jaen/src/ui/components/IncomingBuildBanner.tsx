import {Flex, Link, Text} from '@chakra-ui/react'

export const IncomingBuildBanner = (props: {onUpdateClick: () => void}) => {
  return (
    <Flex
      zIndex={'banner'}
      w="full"
      bg="orange.300"
      color="white"
      h={'20px'}
      py={{base: 2}}
      px={{base: 4}}
      align={'center'}
      justify="center">
      <Text>
        Warning: The version you are working on is outdated, please{' '}
        <Link onClick={props.onUpdateClick}>update to the latest version</Link>!
      </Text>
    </Flex>
  )
}
