import React from 'react'
import {Button} from '@chakra-ui/button'
import {
  Box,
  BoxProps,
  Circle,
  Flex,
  Text,
  FlexProps,
  VStack
} from '@chakra-ui/layout'
import {AnimatePresence, motion} from 'framer-motion'
import {GatsbyImage} from 'gatsby-plugin-image'
import {navigate} from 'gatsby'
import {
  ShopifyProduct,
  getFormattedProductPrices
} from '@snek-at/gatsby-theme-shopify'

import {flipImage} from './style'

export interface ProductshowcaseProps {
  products: ShopifyProduct[]
}

const DescriptionBox = motion<FlexProps>(Flex)
const WeaponBox = motion<BoxProps>(Box)

export const ProductSpotlight = ({products}: ProductshowcaseProps) => {
  const [current, setCurrent] = React.useState(products[0])

  React.useEffect(() => setCurrent(products[0]), [])
  React.useEffect(() => {
    const interval = window.setInterval(() => {
      let indexNext = 0
      if (products.length !== products.indexOf(current) + 1) {
        indexNext = products.indexOf(current) + 1
      }
      setCurrent(products[indexNext])
    }, 10000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <Flex justifyContent="center" alignItems="flex-start">
      <Box
        color="white"
        zIndex="1"
        h="40vh"
        mt="12"
        mb="36"
        w={{base: '300px', md: '770px', lg: '60%'}}
        alignSelf="center">
        <Flex
          direction={{base: 'column', md: 'row'}}
          alignSelf="center"
          alignItems={'center'}
          justifyContent="center">
          <AnimatePresence initial={false}>
            {products.map((weapon, index) => {
              const spotlightMetafields = weapon.metafields.filter(
                ({namespace}) => namespace === 'spotlight'
              )

              const mirrorImage = spotlightMetafields.find(
                ({key, namespace}) =>
                  key === 'mirror_image' && namespace === 'spotlight'
              )

              const shouldMirrorImage = !(mirrorImage?.value === 'true')

              const productPrices = getFormattedProductPrices(weapon)

              return (
                weapon === current && (
                  <WeaponBox
                    zIndex="3"
                    key={index}
                    initial={{opacity: 0, x: -300}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5, type: 'spring'}}>
                    <Text>{mirrorImage?.value}</Text>
                    <Box
                      height={{base: '300px', md: '450px'}}
                      width={{base: '300px', md: '450px'}}
                      mt={'-110px'}
                      css={flipImage(shouldMirrorImage)}>
                      <GatsbyImage
                        imgClassName="image"
                        image={weapon.featuredMedia.image.gatsbyImageData}
                        alt={weapon.featuredMedia.image.altText || weapon.title}
                      />
                    </Box>
                    <Text
                      zIndex="1"
                      transform="rotate(20deg)"
                      borderRadius="10px"
                      py="1"
                      px={{base: '1', md: '3'}}
                      fontSize={{base: '25', md: '35'}}
                      fontWeight="bold"
                      position="relative"
                      mt={{base: '-120px', md: '-190px'}}
                      w="max-content"
                      border="4px"
                      borderColor="agt.red"
                      color="agt.red"
                      userSelect="none">
                      {productPrices.priceFormatted}
                    </Text>
                  </WeaponBox>
                )
              )
            })}
          </AnimatePresence>
          <AnimatePresence>
            {products.map((weapon, index) => {
              const spotlightMetafields = weapon.metafields.filter(
                ({namespace}) => namespace === 'spotlight'
              )

              const title = spotlightMetafields.find(
                ({key, value}) => key === 'titel'
              )
              const description = spotlightMetafields.find(
                ({key, value}) => key === 'description'
              )

              return (
                current === weapon && (
                  <DescriptionBox
                    align={{base: 'center', md: 'flex-start'}}
                    minW={{base: '300px', md: '370px', lg: '60%'}}
                    direction={{base: 'row', md: 'column'}}
                    mt={{base: '14', md: '0'}}
                    w={{base: '300px', md: '370px', lg: '60%'}}
                    key={index}
                    ml={{base: 'auto', lg: '10'}}
                    mr={{base: 'auto', md: '0'}}
                    initial={{opacity: 0, x: 300}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.25, delay: 0.33}}>
                    <Box mt={{base: '-2', md: '0'}}>
                      <Text
                        fontWeight="bold"
                        fontSize={{base: '20', md: '4vw', lg: '2vw'}}
                        casing="uppercase">
                        {title?.value}
                      </Text>
                      <Text
                        minH={{base: 30, md: '8vw', lg: '4vw'}}
                        fontSize={{base: '15', md: '3.5vw', lg: '1.75vw'}}>
                        {description?.value}
                      </Text>
                    </Box>
                    <Button
                      w={{base: '100%', md: '50%'}}
                      ml={{base: 2, md: 0}}
                      size="lg"
                      borderRadius="5px"
                      bg="agt.blue"
                      _hover={{bg: 'white', color: 'black'}}
                      variant="solid"
                      onClick={() => navigate(`/produkte/${weapon.handle}`)}>
                      Mehr davon
                    </Button>
                  </DescriptionBox>
                )
              )
            })}
          </AnimatePresence>
        </Flex>
        <Flex
          justifyContent="center"
          alignContent="center"
          position="relative"
          zIndex="10"
          mt={{base: '10', md: '20'}}
          mb={{base: '10', lg: '5'}}>
          {products.map(weapon => {
            return (
              <Circle
                cursor="pointer"
                size="2"
                mr="1"
                bgColor={weapon === current ? 'agt.red' : 'white'}
                onClick={() => {
                  if (weapon !== current) {
                    setCurrent(weapon)
                  }
                }}
              />
            )
          })}
        </Flex>
      </Box>
    </Flex>
  )
}
