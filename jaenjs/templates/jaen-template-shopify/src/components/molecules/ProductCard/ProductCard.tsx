import React from 'react'
import {
  Flex,
  useColorModeValue,
  Text,
  Box,
  Spacer,
  Badge,
  VStack,
  BoxProps,
  AspectRatio,
  Link,
  HStack
} from '@chakra-ui/react'
import {Link as GatsbyLink} from 'gatsby'
import {
  getFormattedProductPrices,
  getProductTags,
  ShopifyProduct
} from '@snek-at/gatsby-theme-shopify'
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image'
import {
  calculateTextColorForBackgroundColor,
  uuidv1
} from '../../../common/utils'
import {useUserAuth} from '../../../services/useUserAuth'

import * as styles from './styles'

export interface ProductCardProps {
  product: ShopifyProduct
  borderline?: boolean
  left?: boolean
  bwidth?: string
  bcolor?: string
  prefixPath?: string
}

export const ProductCard = ({
  product,
  borderline,
  left,
  bwidth,
  bcolor,
  prefixPath
}: ProductCardProps) => {
  const {user} = useUserAuth()

  const path = prefixPath ? `${prefixPath}/${product.handle}` : product.handle

  const radioRef = React.useRef<(HTMLInputElement | null)[]>([])

  const tags = getProductTags(product)

  const prices = getFormattedProductPrices(product)

  const taxable = user ? false : product.variants[0]?.taxable

  const cardId = uuidv1()

  if (product.media.length === 0) {
    borderline = false
  }

  const coloredBadges: Array<{name: string; color: string}> = []

  if (
    new Date(product.createdAt).getTime() >
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ) {
    coloredBadges.push({name: 'Neu', color: 'agt.blue'})
  }

  if (prices.discountFormatted) {
    coloredBadges.push({name: prices.discountFormatted, color: 'agt.red'})
  }

  return (
    <VStack
      as={GatsbyLink}
      to={path}
      display={'block'}
      css={styles.cardStyle(borderline, bwidth, bcolor, left)}
      boxSize={'full'}
      cursor="pointer"
      // bg="red"
      textAlign={{
        base: 'center',
        md: 'left'
      }}>
        <Box
          className="pcard"
          position="relative"
          cursor="pointer"
          bg={useColorModeValue('white', 'gray.700')}
          px={{base: '1', md: '2', lg: '3'}}
          py="5"
          // h={'full'}
          minH={'full'}
          borderRadius="5px"
          // boxShadow="lg"
          // border="1px"
          // borderColor="border"
          // mt="3"
        >
          <Box position="relative">
            <AspectRatio ratio={10 / 9}>
              <>
                <input
                  type="radio"
                  className="radioimg"
                  name={'imgbox-' + cardId}
                  id={'imgbox-' + cardId + '-' + 0}
                  key={0}
                  ref={el => (radioRef.current[0] = el)}
                  readOnly
                  checked></input>
                <ImageBoxWithTags
                  image={product.featuredMedia?.image}
                  tags={coloredBadges}
                  className="main"
                />
              </>
            </AspectRatio>

            {product.media.map((media, index) => (
              <Box key={index}>
                {index !== 0 && (
                  <Box>
                    <input
                      type="radio"
                      className="radioimg"
                      name={'imgbox-' + cardId}
                      id={'imgbox-' + cardId + '-' + index}
                      ref={el => (radioRef.current[index] = el)}
                    />
                    <ImageBoxWithTags
                      image={media.image}
                      tags={coloredBadges}
                      className="preview"
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Text fontSize="sm" isTruncated>
            {tags.otherString}
          </Text>
          <Text fontWeight="semibold">{product.title}</Text>
          <ProductPrices prices={prices} />
          {taxable && (
            <Text fontSize="xs" color="gray.600" textAlign={'center'}>
              inkl. MwSt.
            </Text>
          )}
          <Spacer
            position="absolute"
            className="bspacer"
            w="0"
            h="100%"
            top="0"
            borderLeft="1px"
            borderColor="border"
            transform="scale(0.97)"
          />
          <Box
            className="borderline"
            cursor="pointer"
            bg={useColorModeValue('white', 'gray.700')}
            px={{base: '1', md: '2', lg: '3'}}
            py="5"
            // h={'full'}
            // minH={'full'}
            borderRadius="5px"
            border="1px"
            borderColor="border"
            _hover={{
              before: {borderColor: 'agt.red'},
              _after: {borderColor: 'agt.red'}
            }}>
            <VStack
              className="imgline"
              position="absolute"
              opacity="0"
              boxSize={'full'}
              py="0.5rem"
              px="1">
              {product.media.map((m, index) => (
                <label htmlFor={'imgbox-' + cardId + '-' + index} key={index}>
                  <Box
                    transform="scale(0.97)"
                    borderBottom="1px"
                    borderColor="border"
                    py="1"
                    _hover={{borderColor: 'agt.red'}}
                    onMouseOver={() =>
                      (radioRef.current[index]!.checked = true)
                    }
                    onMouseLeave={() => (radioRef.current[0]!.checked = true)}>
                    <GatsbyImage
                      onDragStart={e => e.preventDefault()}
                      draggable="false"
                      image={m.image.gatsbyImageData}
                      alt={m.image.altText || ''}
                    />
                  </Box>
                </label>
              ))}
            </VStack>
          </Box>
        </Box>
    </VStack>
  )
}

function ImageBoxWithTags(
  props: {
    image?: {
      altText: string | null
      gatsbyImageData: IGatsbyImageData
    }
    tags: Array<{name: string; color: string}>
  } & BoxProps
) {
  // Box with image as background and tags on bottom
  const {image, tags} = props

  return (
    <Box overflow="hidden" position="relative" {...props}>
      {image && (
        <GatsbyImage
          onDragStart={e => e.preventDefault()}
          draggable="false"
          image={image.gatsbyImageData}
          alt={image.altText || '-'}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      )}
      <Flex position="absolute" top="0" left="0" right="0" p={2}>
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="solid"
            fontSize="sm"
            fontWeight="semibold"
            rounded="md"
            px={2}
            mr={2}
            color={calculateTextColorForBackgroundColor(tag.color)}
            bgColor={tag.color}
            textTransform="none">
            {tag.name}
          </Badge>
        ))}
      </Flex>
    </Box>
  )
}

const ProductPrices = ({
  prices
}: {
  prices: ReturnType<typeof getFormattedProductPrices>
}) => {
  if (prices.compareAtPriceFormatted) {
    return (
      <HStack
        wrap="wrap"
        justifyContent={{
          base: 'center',
          md: 'flex-start'
        }}>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="gray.600"
          textDecoration={'line-through !important'}>
          {prices.compareAtPriceFormatted}
        </Text>
        <Text fontSize="sm" fontWeight="bold" color="red.500" ml={2}>
          {prices.priceFormatted}
        </Text>
      </HStack>
    )
  }

  return (
    <Box fontSize="sm" fontWeight="semibold" mb={2}>
      <Text>{prices.priceFormatted}</Text>
    </Box>
  )
}
