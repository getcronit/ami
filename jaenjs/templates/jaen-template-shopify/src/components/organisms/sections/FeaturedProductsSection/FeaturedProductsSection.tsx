import React from 'react'
import {
  Container,
  SimpleGrid,
  Center,
  Box,
  Heading,
  Link,
  Divider
} from '@chakra-ui/layout'
import {Button} from '@chakra-ui/button'
import {ProductCard} from '../../../molecules/ProductCard'
import {Bullet} from '../../../atoms/Bullet'
import {Link as GatsbyLink, navigate} from 'gatsby'
import {StickyStrokeLogo} from '../../../molecules/StickyStrokeLogo'
import {Field} from '@jaenjs/jaen'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'

import * as style from './style'

export interface FeaturedProductsSectionProps {
  products: ShopifyProduct[]
  getPath: (handle: string) => string
}

export const FeaturedProductsSection = ({
  products,
  getPath
}: FeaturedProductsSectionProps) => {
  return (
    <>
      <StickyStrokeLogo strokeColor="#dbd8d2" backgroundColor="white" />
      <Box position="relative" overflow="hidden" color="ece8e1" pb="4" css={style.Section}>
        <Heading fontSize="30vh" top="10%" left="10%" position="absolute" color="white" style={{WebkitTextStroke: '1px #dbd8d2'}}>
          <span>Si vis pacem</span>
          <span>para bellum</span>
        </Heading>
        <Divider
          orientation='vertical'
          position="absolute"
          // w="0"
          // h="100%"
          top="0"
          left="5vw"
          // borderLeft="1px"
          borderColor="#dbd8d2"
        />
        <Container as="section" maxW="8xl" pt="6" id="featuredproducts">
          <Box textAlign="center" my="10">
            <Heading size="2xl">
              <Field.Text
                name="featured-products-heading"
                defaultValue="Unser Sortiment"
              />
            </Heading>
            <Bullet color="agt.red" w="unset" fontSize="xl" mt="5" mb="10" />
          </Box>
          <SimpleGrid columns={{base: 2, md: 3, xl: 4}} spacing="5">
            {products.map((item, key) => {
              return (
                <Link key={key} as={GatsbyLink} to={getPath(item.handle)} _hover={{textDecoration: 'none'}}>
                  <ProductCard product={item} key={key} borderline />
                </Link>
              )
            })}
          </SimpleGrid>
          <Center mt={{base: '4', md: '10'}}>
            <Button
              color="white"
              borderRadius="5px"
              bg="agt.blue"
              variant="solid"
              size="lg"
              _hover={{bg: 'agt.blueAccent'}}
              onClick={() => navigate('/produkte')}>
              Mehr davon
            </Button>
          </Center>
        </Container>
      </Box>
    </>
  )
}
