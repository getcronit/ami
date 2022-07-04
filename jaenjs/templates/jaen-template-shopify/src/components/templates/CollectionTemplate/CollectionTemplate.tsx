import {
  AspectRatio,
  Box,
  Link,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react'
import {
  CollectionPageData,
  getCollectionStructure
} from '@snek-at/gatsby-theme-shopify'
import {Link as GatsbyLink} from 'gatsby'
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image'

import React from 'react'
import {ReactPhotoCollage} from 'react-photo-collage'
import {gridPadBoxes} from '../../../common/utils'
import {ContainerLayout} from '../../ContainerLayout'
import {BreadcrumbsBanner} from '../../molecules/BreadcrumbsBanner'
import {ProductSlider} from '../../molecules/ProductSlider'

const getCollectionName = (title: string) =>
  getCollectionStructure(title).name || 'No collection title'

export interface CollectionTemplateProps extends CollectionPageData {
  path: string
}

export const CollectionTemplate = ({
  path,
  shopifyCollection,
  subCollections,
  relatedProducts
}: CollectionTemplateProps) => {
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
              collageImages={shopifyCollection.collageImages}
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
                  collageImages={subCollection.collageImages}
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
    src: string
    altText: string | null
    gatsbyImageData?: IGatsbyImageData
  } | null
  collageImages?: string[]
  name: string
  productsCount?: number
}

const CollectionCard = ({
  path,
  image,
  collageImages,
  name,
  productsCount
}: CollectionCardProps) => {
  return (
    <Link
      as={GatsbyLink}
      to={path}
      key={path}
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
          {collageImages ? (
            <ReactPhotoCollage
              width="900px"
              height={['450px', '450px']}
              layout={[1, 4]}
              photos={collageImages.map(image => ({
                source: image
              }))}
              showNumOfRemainingPhotos
            />
          ) : (
            <>
              {image ? (
                <GatsbyImage
                  alt={image.altText || name}
                  image={
                    image.gatsbyImageData || {
                      images: {
                        sources: [],
                        fallback: {
                          src: image.src,
                          sizes: '(min-width: 900px) 900px, 100vw'
                        }
                      },
                      layout: 'constrained',
                      width: 900,
                      height: 900
                    }
                  }
                  style={{
                    minHeight: '100%',
                    minWidth: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              ) : (
                'no image'
              )}
            </>
          )}
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
