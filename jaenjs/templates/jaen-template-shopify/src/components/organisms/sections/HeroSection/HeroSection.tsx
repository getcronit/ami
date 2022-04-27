import React from 'react'
import {Container, Box, Flex} from '@chakra-ui/react'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'

import {BulletShowcase} from '../../../molecules/BulletShowcase'
import {CategoryShowcase} from '../../../molecules/CategoryShowcase'
import {AccessorieShowcase} from '../../../molecules/AccessorieShowcase'
import {ProductSpotlight} from '../../../molecules/ProductSpotlight'
import {ParallaxHero} from '../../../molecules/ParallaxHero'

import {
  getCollectionStructure,
  ShopifyCollection
} from '@snek-at/gatsby-theme-shopify'

export interface CategoryProduct extends ShopifyProduct {
  collections: Array<{
    title: string
  }>
}

export interface HeroSectionProps {
  latestProducts: ShopifyProduct[]
  categoryProducts: CategoryProduct[]
  spotlightProducts: ShopifyProduct[]
  noScroll?: boolean
}

export interface Categories {
  name: string
  path: string
  items: CategoryProduct[]
}

export interface Tabs {
  [name: string]: Categories
}

export const HeroSection = ({
  latestProducts,
  categoryProducts,
  spotlightProducts,
  noScroll
}: HeroSectionProps) => {
  const tabs: Tabs = {}

  categoryProducts.forEach(node => {
    node.collections.forEach(c => {
      const {name, path} = getCollectionStructure(c.title)

      if (!tabs[c.title]) {
        tabs[c.title] = {items: [], name: name || c.title, path: path}
      }
      tabs[c.title].items.push(node)
    })
  })

  return (
    <>
      <Box
        id="hero"
        as="section"
        width={'full'}
        backgroundColor="#210002"
        position="relative"
        overflow="hidden">
        <ParallaxHero noScroll={noScroll} />
        <Container maxW="8xl" py="6">
          <ProductSpotlight products={spotlightProducts} />
          <CategoryShowcase tabs={tabs} latestProducts={latestProducts} />
          <Flex
            mt="8"
            direction={{base: 'column-reverse', lg: 'row'}}
            width="full"
            justifyContent="center"
            alignContent="center">
            <BulletShowcase />
            <AccessorieShowcase />
          </Flex>
        </Container>
      </Box>
    </>
  )
}
