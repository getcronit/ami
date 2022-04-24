import {
  AspectRatio,
  Box,
  Flex,
  useColorModeValue,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
  Text,
  Button,
  Center,
  Divider,
  Icon,
  useClipboard,
  Heading
} from '@chakra-ui/react'
import {
  getFormattedProductPrices,
  ProductPageData
} from '@snek-at/gatsby-theme-shopify'
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image'
import React from 'react'

import {FaHeart} from '@react-icons/all-files/fa/FaHeart'
import {FaShare} from '@react-icons/all-files/fa/FaShare'
import {MdMessage} from '@react-icons/all-files/md/MdMessage'

import {BreadcrumbsBanner} from '../../molecules/BreadcrumbsBanner'
import ContactModal from '../../organisms/ContactModal/ContactModal'

import {replaceHexColorsInHTML} from '../../utils'

import {ContainerLayout} from '../../ContainerLayout'
import {ProductSlider} from '../../molecules/ProductSlider'

export interface ProductPageProps extends ProductPageData {
  path: string
  onWishlistAdd: (id: string) => void
  isOnWishList?: boolean
}

export const ProductPage = ({
  path,
  onWishlistAdd,
  shopifyProduct,
  relatedProducts,
  isOnWishList = false
}: ProductPageProps) => {
  // remove last part of path
  const prefixPath = path.split('/').slice(0, -1).join('/')

  return (
    <>
      <BreadcrumbsBanner path={path} title={shopifyProduct.title} />
      <ContainerLayout>
        <VStack spacing={12} w="100%">
          <Box w="100%">
            <Flex direction={{base: 'column', lg: 'row'}}>
              <ImageSlider
                featuredImage={shopifyProduct.featuredMedia.image}
                images={shopifyProduct.media
                  .filter(m => m.id !== shopifyProduct.featuredMedia.id)
                  .map(m => m.image)}
                description={shopifyProduct.descriptionHtml}
              />
              <ProductDetail
                product={shopifyProduct}
                onWishlistAdd={onWishlistAdd}
                isOnWishList={isOnWishList}
              />
            </Flex>
            <Box display={{base: 'block', md: 'none'}}>
              <ProductMoreDetail description={shopifyProduct.descriptionHtml} />
            </Box>
          </Box>
        </VStack>
        <ProductSlider
          products={relatedProducts.nodes}
          heading="Weitere Empfehlungen"
          prefixPath={prefixPath}
        />
      </ContainerLayout>
    </>
  )
}

function Price({
  prices
}: {
  prices: ReturnType<typeof getFormattedProductPrices>
}) {
  const {priceFormatted, compareAtPriceFormatted} = prices

  if (compareAtPriceFormatted) {
    // strike through price and put discount price on the right side
    return (
      <Flex
        direction="row"
        wrap="wrap"
        justifyContent={{
          base: 'center',
          md: 'flex-start'
        }}>
        <Text
          fontSize="xl"
          fontWeight="semibold"
          color="gray.600"
          textDecoration={'line-through'}>
          {compareAtPriceFormatted}
        </Text>

        <Heading
          size="3xl"
          mt={{
            base: 0,
            md: 4
          }}
          fontWeight={'semibold'}
          color="red.500">
          {priceFormatted}
        </Heading>
      </Flex>
    )
  }

  return (
    <Heading size="3xl" fontWeight={'semibold'}>
      {priceFormatted}
    </Heading>
  )
}

const ProductDetail = (props: {
  product: ProductPageData['shopifyProduct']
  isOnWishList?: boolean
  onWishlistAdd: (id: string) => void
}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const prices = getFormattedProductPrices(props.product)

  return (
    <>
      <ContactModal
        wishlist={[
          {
            title: props.product.title,
            quantity: 1
          }
        ]}
        isOpen={isOpen}
        heading={<p>Kaufanfrage (unverbindlich)</p>}
        text={''}
        onClose={() => onClose()}
      />

      <Box
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        w={{base: '100%', md: '40%'}}
        minW="300px"
        px={{base: 0, md: 4}}
        py={{base: 4, md: 8}}
        m={{base: 0, md: 1}}
        position={'sticky'}
        top="15"
        alignSelf={'flex-start'}>
        <VStack align={'left'} spacing="4">
          <Price prices={prices} />

          <Text fontSize={'xs'} fontWeight={'hairline'}>
            inkl. MwSt.
          </Text>

          <Divider />
          <Text size="xs" fontWeight={'thin'}>
            Artikelnummer: {props.product.variants[0].sku || '-'}
          </Text>
          <Divider />

          <Button
            fontSize={'2xl'}
            fontWeight={'semibold'}
            textTransform="uppercase"
            leftIcon={<Icon as={MdMessage} />}
            borderRadius={'full'}
            bg={'agt.gray'}
            color={'white'}
            _hover={{
              bg: 'agt.blue'
            }}
            size="lg"
            onClick={onOpen}>
            <Text>Jetzt anfragen</Text>
          </Button>
          <Divider />
          <Flex alignItems={'center'} justifyContent="center" fontSize={'xl'}>
            <Box
              mx="auto"
              onClick={() => props.onWishlistAdd(props.product.id)}>
              <Center
                color={props.isOnWishList ? 'red.500' : undefined}
                _hover={{
                  color: props.isOnWishList ? 'red.400' : 'red.300'
                }}
                cursor="pointer">
                <Icon as={FaHeart} mr="2" />
                <Text fontWeight={'semibold'}>Merken</Text>
              </Center>
            </Box>
            <Box mx="auto">
              <ShareText />
            </Box>
          </Flex>
          <Divider />
        </VStack>
      </Box>
    </>
  )
}

function ShareText() {
  const value = typeof window !== 'undefined' ? window.location.href : ''

  const {hasCopied, onCopy} = useClipboard(value)

  return (
    <Center
      color={hasCopied ? 'red.500' : undefined}
      _hover={{
        color: hasCopied ? 'red.400' : 'red.300'
      }}
      verticalAlign="center"
      cursor="pointer">
      <Icon as={FaShare} mr="2" />
      <Text fontWeight={'semibold'} onClick={onCopy}>
        Teilen
        {hasCopied && (
          <Text ml="2" fontWeight={'thin'}>
            (Kopiert!)
          </Text>
        )}
      </Text>
    </Center>
  )
}

type SliderImage = {
  altText: string | null
  gatsbyImageData: IGatsbyImageData
}

const ImageThumbnailWrapItem = (props: {
  image: SliderImage
  active: boolean
  onClick: () => void
}) => {
  const {altText, gatsbyImageData} = props.image
  return (
    <WrapItem
      boxSize={{base: '16', md: '20'}}
      onClick={props.onClick}
      cursor="pointer"
      boxShadow={props.active ? 'inset 0px 4px 0px 0px #eb1933' : 'none'}
      p={2}
      mr={2}
      mb={2}
      _hover={{
        bg: useColorModeValue('gray.300', 'gray.800')
      }}
      transition="ease-out">
      <GatsbyImage image={gatsbyImageData} alt={altText || 'Product image '} />
    </WrapItem>
  )
}

const ImageSlider = (props: {
  featuredImage: SliderImage
  images: Array<SliderImage>
  description?: string
}) => {
  // null is featured image
  const [currentImage, setCurrentImage] = React.useState<SliderImage>(
    props.featuredImage
  )

  return (
    <Box my="4" w={'100%'}>
      <AspectRatio ratio={16 / 9}>
        <Box>
          <GatsbyImage
            image={currentImage.gatsbyImageData}
            alt={currentImage.altText || 'Product Image'}
          />
        </Box>
      </AspectRatio>
      <Wrap
        bg={useColorModeValue('gray.200', 'gray.700')}
        spacing={0}
        justify="center">
        <ImageThumbnailWrapItem
          image={props.featuredImage}
          active={currentImage === props.featuredImage}
          onClick={() => setCurrentImage(props.featuredImage)}
        />

        {props.images.map((image, index) => (
          <ImageThumbnailWrapItem
            key={index}
            image={image}
            active={currentImage.gatsbyImageData === image.gatsbyImageData}
            onClick={() => setCurrentImage(image)}
          />
        ))}
      </Wrap>

      <Box display={{base: 'none', md: 'block'}}>
        <ProductMoreDetail description={props.description || ''} />
      </Box>
    </Box>
  )
}

const ProductMoreDetail = (props: {description: string}) => {
  const color = useColorModeValue('#000000', '#ffffff')

  const html = replaceHexColorsInHTML(props.description, '#000000', color)

  return (
    <Box py="8">
      <Box dangerouslySetInnerHTML={{__html: html}} />
    </Box>
  )
}
