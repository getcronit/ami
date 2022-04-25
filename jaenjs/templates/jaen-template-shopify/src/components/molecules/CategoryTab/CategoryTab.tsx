import React from 'react'
import {
  SimpleGrid,
  Badge,
  Box,
  BoxProps,
  Text,
  Image,
  Circle,
  Flex,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import {AnimatePresence, motion} from 'framer-motion'
import {GatsbyImage} from 'gatsby-plugin-image'
import {Link as GatsbyLink, navigate} from 'gatsby'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'

import {ProductCard} from '../ProductCard'

export interface CategoryTabProps {
  products: ShopifyProduct[]
  direction: string
  visible: string
  getPath: (handle: string) => string
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
  getPath
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
          <SimpleGrid
            columns={{base: 1, sm: 2, md: 3, xl: 6}}
            spacing="5">
            {products.map((item, key) => (
              <Link key={key} as={GatsbyLink} to={getPath(item.handle)} _hover={{textDecoration: 'none'}}>
                <ProductCard product={item} key={key} borderline />
              </Link>
            ))}
          </SimpleGrid>
        </TabBox>
      )}
    </AnimatePresence>
  )
}
