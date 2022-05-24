import React from 'react'
import {Button} from '@chakra-ui/button'
import {Box, Center, Flex, Text} from '@chakra-ui/layout'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'
import {useBreakpointValue} from '@chakra-ui/media-query'
import {navigate} from 'gatsby'

import {CategoryTab} from '../CategoryTab'


interface Tab {
  [category: string]: {
    title: string
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

  const getCategoryPath = (tabTitle: string) => {
    const splitTitle = tabs[tabTitle].title
      .toLowerCase()
      .replaceAll(' ', '-')
      .split(':')
      .splice(1)

    return splitTitle.map(value => `/${value}`).join('')
  }

  const categories = Object.keys(tabs)

  return (
    <Box zIndex="2" position="relative" mt={-20}>
      <Flex direction={{base: 'column', md: 'row'}}>
        {categories.map((category, index) => {
          return (
            <Box
              userSelect="none"
              _hover={
                current === category ? {bg: 'agt.lightgray'} : {bg: '#424240'}
              }
              _first={firstRadius}
              _last={{md: {borderTopRightRadius: '5px'}}}
              cursor="pointer"
              bg={current === category ? 'white' : 'agt.gray'}
              py="3"
              px="5"
              color={current === category ? 'black' : 'white'}
              onClick={() => {
                setCurrent(category)
                setDirection(
                  index > categories.indexOf(current) ? 'right' : 'left'
                )
              }}>
              <Text fontSize="14" fontWeight="bold" casing="uppercase">
                {category}
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
        {categories.map(category => {
          return (
            <CategoryTab
              visible={current === category ? 'visible' : 'hidden'}
              products={tabs[category].items}
              direction={direction}
              getPath={handle => {
                return `${getCategoryPath(category)}/produkte/${handle}`
              }}
            />
          )
        })}
      </Box>
      <Center position="relative" w="full" left="0" top="-6">
        <Button
          color="white"
          borderRadius="5px"
          colorScheme="agt.grayScheme"
          variant="solid"
          size="lg"
          onClick={() =>
            navigate(current === 'New' ? '/produkte' : getCategoryPath(current))
          }>
          Mehr davon
        </Button>
      </Center>
    </Box>
  )
}
