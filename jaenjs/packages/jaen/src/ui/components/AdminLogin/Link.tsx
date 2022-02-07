import {chakra, HTMLChakraProps, useColorModeValue} from '@chakra-ui/system'
import * as React from 'react'

export const Link = (props: HTMLChakraProps<'a'>) => (
  <chakra.a
    marginStart="1"
    href="#"
    color={useColorModeValue('teal.500', 'teal.200')}
    _hover={{color: useColorModeValue('teal.600', 'teal.300')}}
    display={{base: 'block', sm: 'inline'}}
    {...props}
  />
)
