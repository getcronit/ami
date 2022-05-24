import React from 'react'
import {
  Box,
  Heading,
  SimpleGrid,
  SimpleGridProps,
  useBreakpointValue
} from '@chakra-ui/react'
import {ShopifyProduct} from '@snek-at/gatsby-theme-shopify'

import {BulletIcon} from '../../../common/assets/icons'
import {ProductCard} from '../ProductCard'
import {gridPadBoxes} from '../../../common/utils'

export interface ProductGridProps extends SimpleGridProps {
  heading?: string
  products: ShopifyProduct[]
  prefixPath?: string
}

export const ProductGrid = ({
  heading,
  products,
  prefixPath,
  ...gridProps
}: ProductGridProps) => {
  const emptyBoxes = gridPadBoxes(products)

  return (
    <>
      {heading && (
        <Box textAlign="center" my="10">
          <Heading size="2xl">{heading}</Heading>
          <BulletIcon color="agt.red" w="unset" fontSize="xl" mt="5" mb="10" />
        </Box>
      )}

      <SimpleGrid {...gridProps}>
        {products.map((item, index) => {
          return (
            <ProductCard
              prefixPath={prefixPath}
              product={item}
              key={index}
              left={
                0 ===
                (index + 1) %
                  (gridProps.columns
                    ? useBreakpointValue(gridProps.columns)
                    : 0)
              }
              borderline
            />
          )
        })}
        {emptyBoxes}
      </SimpleGrid>
    </>
  )
}
