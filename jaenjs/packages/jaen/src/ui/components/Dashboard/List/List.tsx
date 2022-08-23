import {Box, Stack, StackProps, Text, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'
import {ListItemProps} from './ListItem'

interface ListProps extends StackProps {
  label?: string
}

export const List = (props: ListProps) => {
  const {children, ...stackProps} = props
  const items = React.useMemo(
    () =>
      React.Children.toArray(children)
        .filter<React.ReactElement<ListItemProps>>(React.isValidElement)
        .map((item, index, array) =>
          index + 1 === array.length
            ? React.cloneElement(item, {isLastItem: true})
            : item
        ),
    [children]
  )
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      px={{base: 4, sm: 6}}
      py="5"
      shadow="base"
      rounded="lg">
      {props.label && (
        <Text
          fontSize={'sm'}
          fontWeight="medium"
          noOfLines={1}
          color={useColorModeValue('gray.500', 'gray.400')}
          pb="1">
          {props.label}
        </Text>
      )}
      <Stack as="ul" {...stackProps}>
        {items}
      </Stack>
    </Box>
  )
}
