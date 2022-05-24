import * as React from 'react'
import {SearchIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  VStack,
  Link
} from '@chakra-ui/react'
import {getProductTags, ShopifyProduct} from '@snek-at/gatsby-theme-shopify'

import {Link as GatsbyLink} from 'gatsby'
import {ProductRow} from '../ProductRow'

export interface SearchbarProps {
  searchResultProducts: Array<ShopifyProduct>
  onSearch: (value: string) => void
}

export const SearchbarButton = (props: ButtonProps) => {
  return (
    <Button
      w="full"
      flex="1"
      type="button"
      lineHeight="1.2"
      bg={useColorModeValue('white', 'gray.700')}
      whiteSpace="nowrap"
      display={'flex'}
      alignItems="center"
      color="gray.400"
      py="3"
      px="4"
      outline="0"
      _focus={{shadow: 'outline'}}
      shadow="base"
      rounded="md"
      {...props}>
      <SearchIcon />
      <HStack w="full" mx="3" spacing="4px">
        <Text textAlign="left" flex="1">
          Finde Artikel
        </Text>
        <HStack spacing="4px">
          <VisuallyHidden>Drücke</VisuallyHidden>
          <Kbd color="gray.500" rounded="2px">
            <Box as="abbr" title={'Strg'} textDecoration="none !important">
              {'Strg'}
            </Box>
          </Kbd>
          <VisuallyHidden>und</VisuallyHidden>
          <Kbd color="gray.500" rounded="2px">
            K
          </Kbd>
          <VisuallyHidden> zum suchen</VisuallyHidden>
        </HStack>
      </HStack>
    </Button>
  )
}

export const Searchbar = (props: SearchbarProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  let timeout: NodeJS.Timeout | null = null

  const [searchValue, setSearchValue] = React.useState('')

  const delayedSearch = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    setSearchValue(value)
  }

  React.useEffect(() => {
    if (!timeout) {
      timeout = setTimeout(() => {
        props.onSearch(searchValue)
      }, 500)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [searchValue])

  // event listener for keyboard events
  React.useEffect(() => {
    // handle strg + k
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.ctrlKey) {
        e.preventDefault()
        // prevents the event from being called twice, thus the search modal
        // only opens once
        e.stopImmediatePropagation()

        onOpen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const searchItemBg = useColorModeValue('gray.200', 'gray.600')

  return (
    <>
      <SearchbarButton onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={0} m={2}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color={'agt.blue'} />}
              />
              <Input
                placeholder={'Suche nach Artikeln'}
                border="none"
                _focus={{
                  boxShadow: 'none'
                }}
                color={useColorModeValue('gray.700', 'gray.300')}
                onChange={delayedSearch}
              />
            </InputGroup>
          </ModalHeader>
          <ModalBody px="2">
            {props.searchResultProducts.length > 0 && (
              <>
                <Divider />
                <VStack m="4" align="left">
                  {props.searchResultProducts.map((product, index) => {
                    const tags = getProductTags(product)

                    return (
                      <Link
                        as={GatsbyLink}
                        to={`/products/${product.handle}`}
                        key={index}
                        _hover={{
                          textDecoration: 'none',
                          color: 'agt.blue'
                        }}
                        px="4"
                        py="2"
                        bg={searchItemBg}
                        rounded="md"
                        cursor="pointer"
                        transition="ease-out">
                        <ProductRow
                          title={product.title}
                          featuredMedia={product.featuredMedia}
                          categoryString={tags.categoryString}
                          otherString={tags.otherString}
                        />
                      </Link>
                    )
                  })}
                </VStack>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Searchbar
