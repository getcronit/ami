import {
  AspectRatio,
  Box,
  Text,
  Heading,
  Link,
  SimpleGrid,
  Tag,
  VStack,
  Container,
  Flex
} from '@chakra-ui/react'
import {
  CollectionPageData,
  getCollectionStructure,
  ShopifyCollection
} from '@snek-at/gatsby-theme-shopify'
import {Slider} from '@snek-at/uikit'
import {Link as GatsbyLink} from 'gatsby'
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image'
import React from 'react'
import {BreadcrumbsBanner} from '../../molecules/BreadcrumbsBanner'
import {ProductCard} from '../../molecules/ProductCard'
import {ProductSlider} from '../../molecules/ProductSlider'
import {ContainerLayout} from '../../ContainerLayout'
import {gridPadBoxes} from '../../utils'

const getCollectionName = (title: string) =>
  getCollectionStructure(title).name || 'No collection title'

export interface CollectionPageProps extends CollectionPageData {
  path: string
}

export const CollectionPage = ({
  path,
  shopifyCollection,
  subCollections,
  relatedProducts
}: CollectionPageProps) => {
  const name = getCollectionName(shopifyCollection.title)

  const emptyBoxes: Array<any> = gridPadBoxes(subCollections.nodes, 5)

  return (
    <>
      <BreadcrumbsBanner
        path={path}
        title={`${name} (${shopifyCollection.productsCount})`}
      />

      <ContainerLayout>
        <Box>
          <SimpleGrid spacing="4" minChildWidth="200px" py="8">
            <CollectionCard
              path="products"
              image={shopifyCollection.image}
              name="Alle Produkte anzeigen"
            />
            {subCollections.nodes.map((subCollection, index) => {
              console.log(`index: ${index}`)
              const {name, path} = getCollectionStructure(
                subCollection.title,
                shopifyCollection.title
              )

              return (
                <CollectionCard
                  path={path || 'products'}
                  image={subCollection.image}
                  name={name || 'No collection title'}
                  productsCount={subCollection.productsCount}
                />
              )
            })}
            {emptyBoxes}
          </SimpleGrid>
        </Box>
        <ProductSlider
          products={relatedProducts.nodes}
          heading="Weitere Empfehlungen"
          prefixPath={`${path}/products`}
        />
      </ContainerLayout>
    </>
  )
}

interface CollectionCardProps {
  path: string
  image: {
    altText: string | null
    gatsbyImageData: IGatsbyImageData
  }
  name: string
  productsCount?: number
}

const CollectionCard = ({
  path,
  image,
  name,
  productsCount
}: CollectionCardProps) => {
  return (
    <Link
      as={GatsbyLink}
      to={path}
      key={2323}
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      p="4"
      mb="4"
      cursor="pointer"
      _hover={{
        transform: 'scale(1.05)',
        color: 'agt.blue'
      }}>
      <AspectRatio ratio={1}>
        <VStack>
          <GatsbyImage
            alt={image.altText || name}
            image={image.gatsbyImageData}
            style={{
              minHeight: '100%',
              minWidth: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </VStack>
      </AspectRatio>
      <Text textAlign={'center'}>
        {name}
        {productsCount !== undefined && (
          <Text as="span" fontSize="sm" color="gray.500">
            {` (${productsCount})`}
          </Text>
        )}
      </Text>
    </Link>
  )
}
