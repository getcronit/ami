import {Box, Container, Flex} from '@chakra-ui/react'
import {connectSection, Field} from '@jaenjs/jaen'
import {
  getCollectionStructure,
  getProductTags,
  ShopifyProduct
} from '@snek-at/gatsby-theme-shopify'
import React from 'react'

import {AccessorieShowcase} from '../../../molecules/AccessorieShowcase'
import {BulletShowcase} from '../../../molecules/BulletShowcase'
import {CategoryShowcase} from '../../../molecules/CategoryShowcase'
import {ParallaxHero} from '../../../molecules/ParallaxHero'
import {ProductSpotlight} from '../../../molecules/ProductSpotlight'

export interface CategoryProduct extends ShopifyProduct {}

export interface HeroSectionProps {
  name: string
  displayName: string
  anchor?: string
  latestProducts: ShopifyProduct[]
  categoryProducts: CategoryProduct[]
  spotlightProducts: ShopifyProduct[]
}

export interface HeroProps {
  anchor?: string
  latestProducts: ShopifyProduct[]
  categoryProducts: ShopifyProduct[]
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

export const Hero = ({
  anchor,
  latestProducts,
  categoryProducts,
  spotlightProducts,
  noScroll
}: HeroProps) => {
  const tabs: Tabs = {}

  categoryProducts.forEach(node => {
    const tags = getProductTags(node)

    tags.categoryTags.forEach(title => {
      const {name, path} = getCollectionStructure(title)

      if (!tabs[title]) {
        tabs[title] = {items: [], name: name || title, path: path}
      }
      tabs[title].items.push(node)
    })
  })

  return (
    <>
      <Box
        id={anchor}
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
            direction={{base: 'column-reverse', xl: 'row'}}
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

export const HeroSection = ({
  anchor,
  name,
  displayName,
  latestProducts,
  categoryProducts,
  spotlightProducts
}: HeroSectionProps) =>
  connectSection(
    () => {
      return (
        <Hero
          anchor={anchor}
          latestProducts={latestProducts}
          categoryProducts={categoryProducts}
          spotlightProducts={spotlightProducts}
        />
      )
    },
    {
      name: name,
      displayName: displayName
    }
  )

export const HeroSectionJSX = ({
  name,
  displayName,
  anchor,
  latestProducts,
  categoryProducts,
  spotlightProducts
}: HeroSectionProps) => (
  <Field.Section
    name={name}
    displayName={displayName}
    sections={[
      HeroSection({
        name: `${name}-item`,
        anchor,
        displayName,
        latestProducts,
        categoryProducts,
        spotlightProducts
      })
    ]}
  />
)
