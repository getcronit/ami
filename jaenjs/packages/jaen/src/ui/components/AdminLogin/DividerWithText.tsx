import {
  Box,
  Divider,
  StackProps,
  HStack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import * as React from 'react'

export const DividerWithText = (props: StackProps) => {
  const {children, ...flexProps} = props
  return (
    <HStack color="gray.300" {...flexProps}>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
      <Text
        as="span"
        px="3"
        color={useColorModeValue('gray.600', 'gray.400')}
        fontWeight="medium">
        {children}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </HStack>
  )
}
