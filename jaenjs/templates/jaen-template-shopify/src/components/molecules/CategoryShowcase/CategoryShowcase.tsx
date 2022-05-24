import React from 'react'
import {Button} from '@chakra-ui/button'
import {Box, Center, Flex, HStack, Text} from '@chakra-ui/layout'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'
import {useBreakpointValue} from '@chakra-ui/media-query'
import {Link as GatsbyLink} from 'gatsby'

import {CategoryTab} from '../CategoryTab'
import {getThemeColor} from '../../../common/utils'
import * as style from './style'

interface Tab {
  [category: string]: {
    name: string
    path: string
    items: ShopifyProduct[]
    position?: number
  }
}

export interface CategoryShowcaseProps {
  tabs: Tab
  latestProducts: ShopifyProduct[]
}

export const CategoryShowcase = ({
  tabs,
  latestProducts
}: CategoryShowcaseProps) => {
  const [current, setCurrent] = React.useState('LATEST')
  const [direction, setDirection] = React.useState('right')

  const firstRadius = useBreakpointValue({
    base: {borderTopRadius: '5px', borderLeft: '1px', borderRight: "1px"},
    md: {borderTopLeftRadius: '5px', borderLeft: '1px', borderRight: "0px"}
  })

  tabs['LATEST'] = {
    name: 'Neueste Produkte',
    path: '',
    items: latestProducts,
    position: -100
  }

  const tabsList = Object.entries(tabs).sort((a, b) => {
    const aPosition = a[1].position || 0
    const bPosition = b[1].position || 0

    return aPosition - bPosition
  })

  return (
    <Box zIndex="2" position="relative" mt={-20} css={style.CategoryShowcase(getThemeColor("border"))} >
      <Flex>
        <Flex direction={{base: 'column', md: 'row'}} borderTopLeftRadius='5px' w={{base: '100%', md: 'unset'}}>
          {tabsList.map(([titel, collection], index) => {
            const isCurrent = current === titel
            return (
              <Box
                className="tabs"
                userSelect="none"
                minW='max-content'
                _hover={isCurrent ? {bg: 'agt.lightgray'} : {bg: '#424240'}}
                borderTop="1px"
                _first={firstRadius}
                _last={{base: {borderTopRadius: '0px',  borderLeft: '1px', borderRight: "1px"}, md: {borderTopRightRadius: '5px', borderLeft: '0px', borderRight: "1px"}}}
                cursor="pointer"
                bg={isCurrent ? 'primary' : 'agt.gray'}
                py="3"
                px="5"
                color={isCurrent ? 'text' : 'white'}
                onClick={() => {
                  setCurrent(titel)

                  setDirection(
                    index >
                      Object.keys(Object.fromEntries(tabsList)).indexOf(current)
                      ? 'right'
                      : 'left'
                  )
                }}>
                <Text fontSize="14" fontWeight="bold" casing="uppercase">
                  {collection.name}
                </Text>
              </Box>
            )
          })}
        </Flex>
        <Box w="100%" borderColor="border" borderBottom="1px" display={{base: 'none', md: 'block'}} />
      </Flex>
      
      <Box
        justifyContent="center"
        alignContent="center"
        p={{md: '6', lg: '10'}}
        pl={{base: '0', lg: '10'}}
        minH={{base: '1010px', md: '700px', lg: '390px'}}
        pb="20"
        bg="primary"
        border="1px"
        borderColor="border"
        borderTop="none"
        borderBottomRadius="5px"
        borderTopRightRadius={{md: '5px'}}>
        {tabsList.map(([titel, collection], index) => {
          return (
            <CategoryTab
              visible={current === titel ? 'visible' : 'hidden'}
              products={collection.items
                .sort((a, b) =>
                  new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
                )
                .slice(0, 6)}
              direction={direction}
              prefixPath={`${collection.path}/products`}
            />
          )
        })}
      </Box>
      <Center position="relative" w="full" left="0" top="-6">
        <Button
          as={GatsbyLink}
          to={
            current === 'LATEST'
              ? '/products'
              : `${tabs[current].path}/products`
          }
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
