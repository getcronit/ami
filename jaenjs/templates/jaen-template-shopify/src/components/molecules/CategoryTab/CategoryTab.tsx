import React from 'react'
import {Button} from '@chakra-ui/button'
import {
  Box,
  BoxProps,
  Center,
  Flex,
  SimpleGrid,
  Text,
  Link
} from '@chakra-ui/layout'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'
import {useBreakpointValue} from '@chakra-ui/media-query'
import {AnimatePresence, motion} from 'framer-motion'
import {Link as GatsbyLink} from 'gatsby'

import {ProductGrid} from '../ProductGrid'

export interface CategoryTabProps {
  products: ShopifyProduct[]
  direction: string
  visible: string
  prefixPath: string
}

const TabBox = motion<BoxProps>(Box)

const variants = {
  enter: (direction: string) => {
    return {
      position: 'absolute',
      y: direction === 'right' ? 75 : -75,
      opacity: 0
    }
  },
  center: {
    position: 'relative',
    opacity: 1,
    y: 0
  },
  exit: (direction: string) => {
    return {
      position: 'absolute',
      display: 'none',
      y: direction === 'right' ? -75 : 75,
      opacity: 0
    }
  }
}

export const CategoryTab = ({
  products,
  direction,
  visible,
  prefixPath
}: CategoryTabProps) => {
  return (
    <AnimatePresence exitBeforeEnter custom={direction}>
      {visible === 'visible' && (
        <TabBox
          position="relative"
          key={visible}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          px={2}
          transition={{duration: 0.15}}>
          <ProductGrid products={products} spacing="5" columns={{base: 2, sm: 2, md: 3, xl: 6}} />
        </TabBox>
      )}
    </AnimatePresence>
  )
}

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
    base: {borderTopRadius: '5px'},
    md: {borderTopLeftRadius: '5px'}
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
    <Box zIndex="2" position="relative" mt={-20}>
      <Flex direction={{base: 'column', md: 'row'}}>
        {tabsList.map(([titel, collection], index) => {
          const isCurrent = current === titel
          return (
            <Box
              userSelect="none"
              _hover={isCurrent ? {bg: 'agt.lightgray'} : {bg: '#424240'}}
              _first={firstRadius}
              _last={{md: {borderTopRightRadius: '5px'}}}
              cursor="pointer"
              bg={isCurrent ? 'primary' : 'agt.gray'}
              py="3"
              px="5"
              color={isCurrent ? 'black' : 'white'}
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
      <Box
        justifyContent="center"
        alignContent="center"
        p={{md: '6', lg: '10'}}
        pl={{base: '0', lg: '10'}}
        // minH={{base: '1010px', md: '700px', lg: '390px'}}
        pb="20"
        bg="primary"
        overflow="hidden"
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
