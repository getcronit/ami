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
  Heading,
  HStack
} from '@chakra-ui/react'
import {
  getFormattedProductPrices,
  getProductTags,
  ProductPageData,
  ShopifyProduct
} from '@snek-at/gatsby-theme-shopify'
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image'
import React from 'react'

import {FaHeart} from '@react-icons/all-files/fa/FaHeart'
import {FaShare} from '@react-icons/all-files/fa/FaShare'
import {MdMessage} from '@react-icons/all-files/md/MdMessage'

import {BreadcrumbsBanner} from '../../molecules/BreadcrumbsBanner'
import ContactModal from '../../organisms/ContactModal/ContactModal'

import {replaceHexColorsInHTML} from '../../../common/utils'

import {ContainerLayout} from '../../ContainerLayout'
import {ProductSlider} from '../../molecules/ProductSlider'
import {useUserAuth} from '../../../services/useUserAuth'

export interface ProductTemplateProps extends ProductPageData {
  path: string
  onWishlistAdd: (id: string) => void
  isOnWishList?: boolean
}

export const ProductTemplate = ({
  path,
  onWishlistAdd,
  shopifyProduct,
  relatedProducts,
  isOnWishList = false
}: ProductTemplateProps) => {
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
                featuredMedia={shopifyProduct.featuredMedia}
                media={shopifyProduct.media.filter(
                  m => m.id !== shopifyProduct.featuredMedia?.id
                )}
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
  const {user} = useUserAuth()

  console.log('proeuct user', user)

  const {isOpen, onOpen, onClose} = useDisclosure()

  const prices = getFormattedProductPrices(props.product)

  const taxable = user ? false : props.product.variants[0]?.taxable

  console.log(user, props.product.variants[0]?.taxable)
  console.log(taxable)

  const tags = getProductTags(props.product)

  const productTags = []

  if (tags.categoryString) {
    productTags.push(tags.categoryString)
  }

  if (tags.otherString) {
    productTags.push(tags.otherString)
  }

  if (props.product.vendor !== '-') {
    productTags.push(`Hersteller: ${props.product.vendor}`)
  }

  if (props.product.productType && props.product.productType !== '-') {
    productTags.push(`Art: ${props.product.productType}`)
  }

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

          {taxable && (
            <Text fontSize="xs" color="gray.600">
              inkl. MwSt.
            </Text>
          )}

          <Divider />

          {productTags.map((tag, index) => (
            <Box
              as="span"
              fontSize={'xs'}
              fontWeight={'hairline'}
              color="gray.600"
              mr={2}
              key={index}>
              {tag}
            </Box>
          ))}

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

type SliderMedia = ShopifyProduct['featuredMedia']

const ImageThumbnailWrapItem = (props: {
  media: SliderMedia
  active: boolean
  onClick: () => void
}) => {
  if (!props.media) {
    return null
  }

  const {gatsbyImageData, altText} = props.media.image

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
  featuredMedia: SliderMedia
  media: ShopifyProduct['media']
  description?: string
}) => {
  // null is featured image
  const [currentMedia, setCurrentMedia] = React.useState<SliderMedia>(
    props.featuredMedia
  )

  return (
    <Box my="4" w={'100%'}>
      <AspectRatio ratio={16 / 9}>
        <Box>
          {currentMedia?.image && (
            <GatsbyImage
              image={currentMedia.image.gatsbyImageData}
              alt={currentMedia.image.altText || 'Product Image'}
            />
          )}
        </Box>
      </AspectRatio>
      <Wrap
        bg={useColorModeValue('gray.200', 'gray.700')}
        spacing={0}
        justify="center">
        <ImageThumbnailWrapItem
          media={props.featuredMedia}
          active={currentMedia === props.featuredMedia}
          onClick={() => setCurrentMedia(props.featuredMedia)}
        />

        {props.media.map((media, index) => (
          <ImageThumbnailWrapItem
            key={index}
            media={media}
            active={currentMedia?.id === media.id || false}
            onClick={() => setCurrentMedia(media)}
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
