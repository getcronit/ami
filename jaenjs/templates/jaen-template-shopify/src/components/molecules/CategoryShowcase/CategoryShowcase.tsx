import React from 'react'
import {Button} from '@chakra-ui/button'
import {Box, Center, Flex, Text, Link} from '@chakra-ui/layout'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'
import {useBreakpointValue} from '@chakra-ui/media-query'
import {navigate, Link as GatsbyLink} from 'gatsby'

import {CategoryTab} from '../CategoryTab'


interface Tab {
  [category: string]: {
    name: string
    path: string
    items: ShopifyProduct[]
  }
}

export interface CategoryShowcaseProps {
  tabs: Tab
}

export const CategoryShowcase = ({tabs}: CategoryShowcaseProps) => {
  const [current, setCurrent] = React.useState('New')
  const [direction, setDirection] = React.useState('right')

  const firstRadius = useBreakpointValue({
    base: {borderTopRadius: '5px'},
    md: {borderTopLeftRadius: '5px'}
  })
  console.log(tabs)
  return (
    <Box zIndex="2" position="relative" mt={-20}>
      <Flex direction={{base: 'column', md: 'row'}}>
        {Object.entries(tabs).map(([titel, collection], index) => {
          const isCurrent = (current === titel)
          return (
            <Box
              userSelect="none"
              _hover={
                isCurrent ? {bg: 'agt.lightgray'} : {bg: '#424240'}
              }
              _first={firstRadius}
              _last={{md: {borderTopRightRadius: '5px'}}}
              cursor="pointer"
              bg={isCurrent ? 'white' : 'agt.gray'}
              py="3"
              px="5"
              color={isCurrent ? 'black' : 'white'}
              onClick={() => {
                setCurrent(titel)
                setDirection(
                  index > Object.keys(tabs).indexOf(current) ? 'right' : 'left'
                )
              }}>
              <Text fontSize="14" fontWeight="bold" casing="uppercase">
                {collection.name}
              </Text>
            </Box>
          )
        })}
      </Flex>
      <Box
        justifyContent="center"
        alignContent="center"
        p={{md: '6', lg: '10'}}
        pl={{base: '0', lg: '10'}}
        minH={{base: '1010px', md: '700px', lg: '390px'}}
        pb="20"
        bg="white"
        borderBottomRadius="5px"
        borderTopRightRadius={{md: '5px'}}>
        {Object.entries(tabs).map(([titel, collection], index) => {
          return (
            <CategoryTab
              visible={current === titel ? 'visible' : 'hidden'}
              products={collection.items.sort((a,b) => new Date(a.createdAt) < new Date(b.createdAt)? 1 : -1).slice(0,6)}
              direction={direction}
              getPath={handle => {
                return `${collection.path}/produkte/${handle}`
              }}
            />
          )
        })}
      </Box>
      <Center position="relative" w="full" left="0" top="-6">
        <Button
          as={GatsbyLink}
          to={current === 'New' ? '/products' : `${tabs[current].path}/products`}
          color="white"
          borderRadius="5px"
          colorScheme="agt.grayScheme"
          variant="solid"
          size="lg">
          Mehr davon
        </Button>
      </Center>
    </Box>
  )
}
