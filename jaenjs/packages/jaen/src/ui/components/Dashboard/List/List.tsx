import {Stack, StackProps, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'
import {ListItemProps} from './ListItem'

export const List = (props: StackProps) => {
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
    <Stack
      as="ul"
      px={{base: 4, sm: 6}}
      py="5"
      bg={useColorModeValue('white', 'gray.700')}
      shadow="base"
      rounded="lg"
      {...stackProps}>
      {items}
    </Stack>
  )
}
