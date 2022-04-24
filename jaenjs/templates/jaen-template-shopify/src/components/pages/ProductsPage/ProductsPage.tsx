import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  Heading,
  Icon,
  Select,
  Spacer,
  Spinner,
  Tag,
  useColorModeValue,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react'
import {FaFilter} from '@react-icons/all-files/fa/FaFilter'
import {FaSort} from '@react-icons/all-files/fa/FaSort'
import {
  ProductsPageContext,
  ProductsPageData,
  ShopifyProduct
} from '@snek-at/gatsby-theme-shopify'
import React from 'react'
import {BreadcrumbsBanner} from '../../molecules/BreadcrumbsBanner'
import {ContainerLayout} from '../../ContainerLayout'
import {ProductGrid} from '../../molecules/ProductGrid'
import {Filter} from './Filter'

export interface ProductsPageProps extends ProductsPageData {
  path: string
  products: ShopifyProduct[]
  implicitTags: ProductsPageContext['implicitTags']
  tags: ProductsPageContext['tags']
  minPrice: ProductsPageContext['minPrice']
  maxPrice: ProductsPageContext['maxPrice']
  isFetching: boolean
  fetchNextPage: () => void
  updateFilter: (filter: {
    tags?: string[]
    minPrice?: number
    maxPrice?: number
  }) => void
  sortOptions: string[]
  onSortChange: (sort: string) => void
}

export const ProductsPage = (props: ProductsPageProps) => {
  const [activeTags, setActiveTags] = React.useState<string[]>([])

  const mobile = useDisclosure()
  const [isDesktop] = useMediaQuery('(min-width: 1268px)')

  const gridRef = React.useRef<HTMLDivElement>(null)

  const fetchMore = React.useCallback(() => {
    props.fetchNextPage()
  }, [props.isFetching, props.fetchNextPage])

  React.useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const yOfDivEnd = gridRef.current.getBoundingClientRect().bottom

        const currentScroll = window.pageYOffset + window.innerHeight

        if (yOfDivEnd < currentScroll) {
          fetchMore()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const updateTags = (tags: string[]) => {
    setActiveTags(tags)

    props.updateFilter({
      tags
    })
  }

  const hasTagsFilter = props.tags.length > 0

  const hasPriceFilter = !!(
    props.minPrice &&
    props.maxPrice &&
    props.minPrice !== props.maxPrice
  )

  const disableFilter = !hasTagsFilter && !hasPriceFilter

  const filter = !disableFilter ? (
    <Filter
      activeTags={activeTags}
      allTags={props.tags}
      onActiveTagsChange={updateTags}
      priceFilter={
        hasPriceFilter
          ? {
              minPrice: props.minPrice!,
              maxPrice: props.maxPrice!,
              onPriceChange: (minPrice, maxPrice) =>
                props.updateFilter({minPrice, maxPrice})
            }
          : undefined
      }
    />
  ) : null

  return (
    <>
      <BreadcrumbsBanner title="Produkte" path={props.path} />
      <ContainerLayout>
        <Header
          isMobile={!isDesktop}
          onMobileFilterClick={mobile.onToggle}
          sortOptions={props.sortOptions}
          onSortChange={props.onSortChange}
          disableFilter={!hasTagsFilter && !hasPriceFilter}
        />
        <Flex>
          {!disableFilter && (
            <>
              {!isDesktop ? (
                <Drawer
                  isOpen={mobile.isOpen}
                  onClose={mobile.onClose}
                  placement="left"
                  blockScrollOnMount={false}>
                  <DrawerContent p="4">
                    <Heading as="h3" mb="4">
                      Filter
                    </Heading>
                    {filter}
                  </DrawerContent>
                </Drawer>
              ) : (
                <Box
                  w="30%"
                  position={'sticky'}
                  top="12"
                  alignSelf={'flex-start'}>
                  {filter}
                </Box>
              )}
            </>
          )}

          <Box w="100%" ref={gridRef}>
            <ProductGrid products={props.products} />
            {props.isFetching && (
              <Center w="100%" h="xs">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="agt.blue"
                  size="xl"
                />
              </Center>
            )}
          </Box>
        </Flex>
      </ContainerLayout>
    </>
  )
}

export const Header = (props: {
  sortOptions: Array<string>
  onSortChange: (option: string) => void
  isMobile?: boolean
  onMobileFilterClick?: () => void
  disableFilter?: boolean
}) => {
  return (
    <>
      <Box
        my="2"
        position={'sticky'}
        top="0"
        alignSelf={'flex-start'}
        zIndex="1"
        bg={useColorModeValue('white', 'gray.700')}>
        <Flex>
          {!props.disableFilter && (
            <>
              {props.isMobile ? (
                <Button
                  variant="unstyled"
                  leftIcon={<Icon as={FaFilter} />}
                  onClick={props.onMobileFilterClick}>
                  Filter
                </Button>
              ) : (
                <Button
                  leftIcon={<Icon as={FaFilter} />}
                  variant="unstyled"
                  cursor={'default'}
                  _focus={{boxShadow: 'none'}}>
                  Filter
                </Button>
              )}
            </>
          )}

          <Spacer />
          <Box>
            <Select
              placeholder="Sortieren"
              variant={'unstyled'}
              my="2"
              icon={<Icon as={FaSort} mb="1" />}
              onChange={e => props.onSortChange(e.target.value)}>
              {props.sortOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
        <Divider />
      </Box>
    </>
  )
}
