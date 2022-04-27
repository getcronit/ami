import React from 'react'

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Spacer,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'

import {FaFilter} from '@react-icons/all-files/fa/FaFilter'
import {FaSort} from '@react-icons/all-files/fa/FaSort'

// tag builder => input tag output type:content

export const Header = (props: {
  title: string
  path: string
  sortOptions: Array<string>
  onSortChange: (option: string) => void
  isMobile?: boolean
  onMobileFilterClick?: () => void
}) => {
  return (
    <>
      {/* <Breadcrumbs path={props.path} />
        <Heading size="2xl">{props.title}</Heading> */}
      <Box
        my="2"
        position={'sticky'}
        top="0"
        alignSelf={'flex-start'}
        zIndex="1"
        bg={useColorModeValue('white', 'gray.700')}>
        <Flex>
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

const PriceRangeFilter = (props: {
  minPrice: number
  maxPrice: number
  onPriceChange: (min: number, max: number) => void
}) => {
  const [value, setValue] = React.useState([props.minPrice, props.maxPrice])

  const handlePriceChange = (value: [number, number]) => {
    setValue(value)
  }

  return (
    <Box>
      <Text fontWeight={'bold'}>
        {`Preisklasse (${value[0]} - ${value[1]}€)`}
      </Text>

      <Box px="4">
        <RangeSlider
          min={props.minPrice}
          max={props.maxPrice}
          value={value}
          onChange={handlePriceChange}
          onChangeEnd={value => props.onPriceChange(value[0], value[1])}>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0} />
          <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider>
      </Box>
    </Box>
  )
}

interface CheckboxFilterProps {
  label: string
  values: Array<{
    label: string
    value: string
  }>
  activeValues: Array<string>
  onChange: (values: Array<string>) => void
  height?: StackProps['height']
}

const CheckboxFilterBox = ({
  label,
  values,
  activeValues,
  onChange,
  height = '44'
}: CheckboxFilterProps) => {
  if (values.length === 0) {
    return null
  }

  return (
    <Stack spacing={1}>
      <Text fontWeight={'semibold'}>{label}</Text>
      <Stack spacing={2} h={height} overflowY="scroll">
        {values.map(v => {
          const isActive = activeValues.includes(v.value)

          return (
            <Checkbox
              key={v.value}
              isChecked={isActive}
              onChange={() =>
                onChange(
                  isActive
                    ? activeValues.filter(t => t !== v.value)
                    : [...activeValues, v.value]
                )
              }>
              {v.label}
            </Checkbox>
          )
        })}
      </Stack>
    </Stack>
  )
}

interface FilterProps {
  allTags: Array<string> // ["category:test",...]
  activeTags: Array<string>
  allVendors: Array<string>
  activeVendors: Array<string>
  allProductTypes: Array<string>
  activeProductTypes: Array<string>
  onActiveTagsChange: (tags: FilterProps['activeTags']) => void
  onActiveVendorsChange: (vendors: FilterProps['activeVendors']) => void
  onActiveProductTypesChange: (
    productTypes: FilterProps['activeProductTypes']
  ) => void
  priceFilter?: React.ComponentProps<typeof PriceRangeFilter>
}

export const Filter = (props: FilterProps) => {
  const [activeTags, setActiveTags] = React.useState(props.activeTags)

  const {Kategorie: category, ...groupedFilter} = React.useMemo(() => {
    const grouped: {
      [group: string]: Array<{
        tag: string
        label: string
      }>
    } = {}

    for (const tag of Object.values(props.allTags)) {
      const [group, ...tagParts] = tag.split(':')

      const label = tagParts[tagParts.length - 1]

      grouped[group] = grouped[group] || []
      grouped[group].push({
        tag,
        label
      })
    }

    return grouped
  }, [props.allTags])

  const handleActiveTabsChange = (tags: string[]) => {
    setActiveTags(tags)

    props.onActiveTagsChange(tags)
  }

  return (
    <VStack px="2" spacing={4} divider={<Divider />} align="stretch">
      <CheckboxFilterBox
        label="Kategorie"
        values={category.map(c => ({
          label: c.label,
          value: c.tag
        }))}
        activeValues={activeTags}
        onChange={handleActiveTabsChange}
      />

      <CheckboxFilterBox
        label="Hersteller"
        values={props.allVendors.map(v => ({
          label: v,
          value: v
        }))}
        activeValues={props.activeVendors}
        onChange={props.onActiveVendorsChange}
        height={'24'}
      />

      <CheckboxFilterBox
        label="Art"
        values={props.allProductTypes.map(v => ({
          label: v,
          value: v
        }))}
        activeValues={props.activeProductTypes}
        onChange={props.onActiveProductTypesChange}
        height={'14'}
      />

      {props.priceFilter && <PriceRangeFilter {...props.priceFilter} />}

      {Object.entries(groupedFilter).map(([tagType, values]) => (
        <CheckboxFilterBox
          label={tagType}
          values={values.map(c => ({
            label: c.label,
            value: c.tag
          }))}
          activeValues={activeTags}
          onChange={handleActiveTabsChange}
          height={'20'}
        />
      ))}
    </VStack>
  )
}
