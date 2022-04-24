import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image'

import {MdMessage} from '@react-icons/all-files/md/MdMessage'
import {FaHeartBroken} from '@react-icons/all-files/fa/FaHeartBroken'

import React from 'react'

import {Link as GatsbyLink} from 'gatsby'
import {WishlistProduct} from '../../../services/wishlist'
import {ContainerLayout} from '../../ContainerLayout'
import {ProductRow} from '../../molecules/ProductRow'
import {BreadcrumbsBanner} from '../../molecules/BreadcrumbsBanner'

const ContinueShoppingText = () => (
  <HStack
    mt={{
      base: 2,
      md: 4
    }}
    justify="center">
    <Text>oder,</Text>
    <Link
      as={GatsbyLink}
      color={'agt.blue'}
      fontWeight="semibold"
      to="/products">
      zu den Artikeln
    </Link>
  </HStack>
)

const SummaryBox = (props: {totalPrice: number; onRequestNow: () => void}) => {
  return (
    <>
      <VStack
        align="left"
        spacing={6}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={{
          base: 4,
          md: 6
        }}>
        <Heading as="h3" size="md" fontWeight="bold" mb={2}>
          Wunschliste Übersicht
        </Heading>
        <HStack justifyContent={'space-between'}>
          <Text fontSize={'xl'}>Total</Text>
          <Text ml={2} fontSize={'2xl'} fontWeight="extrabold">
            {props.totalPrice} €
          </Text>
        </HStack>
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
          onClick={props.onRequestNow}>
          <Text>Jetzt anfragen</Text>
        </Button>
      </VStack>
      <ContinueShoppingText />
    </>
  )
}

const EmptyWishList = () => {
  return (
    <VStack
      align="center"
      justify="center"
      w="100%"
      h="100%"
      p={{
        base: 4,
        md: 6
      }}
      spacing={6}
      bg={useColorModeValue('gray.200', 'gray.700')}
      borderRadius="sm">
      <Icon as={FaHeartBroken} boxSize={20} color="agt.red" />
      <Heading as="h3" size="md" fontWeight="bold" mb={2}>
        Wunschliste ist leer
      </Heading>
      <Text fontSize={'xl'}>
        Füllen Sie sie mit Ihren Wunschartikeln aus dem Shop auf.
      </Text>
      <ContinueShoppingText />
    </VStack>
  )
}

export const WishlistPage = (props: {
  path: string
  items: Array<WishlistProduct>
  onRemove: (id: string) => void
  onQuantityChange: (id: string, quantity: number) => void
  onRequestNow: () => void
}) => {
  const itemLength = props.items.length

  const totalPrice = props.items.reduce(
    (acc, item) => acc + parseInt(item.price) * item.quantity,
    0
  )

  const summaryBox = (
    <SummaryBox totalPrice={totalPrice} onRequestNow={props.onRequestNow} />
  )

  return (
    <>
      <BreadcrumbsBanner path={props.path} title="Wunschliste" />
      <ContainerLayout>
        <Box
          m={{
            base: 4,
            lg: 6,
            xl: 12
          }}>
          <Heading as="h1" size="lg" fontWeight="extrabold" pb={4}>
            Wunschliste {`(${itemLength} Artikel)`}
          </Heading>
          {itemLength > 0 ? (
            <>
              <Flex>
                <VStack align="left" w="100%">
                  {props.items.map(item => (
                    <WishListItem
                      key={item.id}
                      {...item}
                      onRemove={() => props.onRemove(item.id)}
                      onQuantityChange={(quantity: number) =>
                        props.onQuantityChange(item.id, quantity)
                      }
                    />
                  ))}
                </VStack>
                <Box
                  ml={12}
                  display={{
                    base: 'none',
                    xl: 'block'
                  }}>
                  {summaryBox}
                </Box>
              </Flex>
              <Box
                my={8}
                mx={{
                  base: 0,
                  md: 16
                }}
                display={{
                  base: 'block',
                  xl: 'none'
                }}>
                {summaryBox}
              </Box>
            </>
          ) : (
            <EmptyWishList />
          )}
        </Box>
      </ContainerLayout>
    </>
  )
}

const WishListItem = (
  props: {
    onQuantityChange: (value: number) => void
    onRemove: () => void
  } & WishlistProduct
) => {
  const imageWithText = (
    <Link as={GatsbyLink} to={`/products/${props.handle}`}>
      <ProductRow
        title={props.title}
        featuredMedia={props.image}
        categoryString={props.categoriesString}
        otherString={props.tagsString}
      />
    </Link>
  )

  const stepper = (
    <Stepper onChange={props.onQuantityChange} value={props.quantity} />
  )

  const price = (
    <Text
      fontWeight={'semibold'}
      color={props.compareAtPrice ? 'red' : 'black'}>
      {props.price}
    </Text>
  )

  return (
    <>
      <HStack
        w="100%"
        p={2}
        display={{
          base: 'none',
          md: 'flex'
        }}
        spacing={{
          base: 4,
          md: 8,
          lg: 12
        }}>
        <Flex flex="1">{imageWithText}</Flex>
        <Flex my={'auto'}>{stepper}</Flex>

        <Flex my={'auto'}>{price}</Flex>

        <Flex my="auto">
          <CloseButton onClick={props.onRemove} />
        </Flex>
      </HStack>
      <Flex
        w="100%"
        p="2"
        justifyContent={'space-between'}
        flexDirection="column"
        display={{
          base: 'flex',
          md: 'none'
        }}>
        {imageWithText}
        <HStack justifyContent={'space-between'} pt="2">
          <Text
            cursor={'pointer'}
            fontWeight="normal"
            fontSize="sm"
            textDecoration={'underline'}
            onClick={props.onRemove}>
            Delete
          </Text>
          {stepper}
          {price}
        </HStack>
      </Flex>
    </>
  )
}
function Stepper(props: {value?: number; onChange: (value: number) => void}) {
  return (
    <NumberInput
      defaultValue={props.value || 1}
      min={1}
      size="sm"
      maxW={20}
      allowMouseWheel
      onChange={(_, v) => props.onChange(v)}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
