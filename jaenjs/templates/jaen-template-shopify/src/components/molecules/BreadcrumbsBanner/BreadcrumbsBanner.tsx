import React from 'react'
import {ChevronRightIcon} from '@chakra-ui/icons'
import {FaHome} from '@react-icons/all-files/fa/FaHome'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Icon,
  Text
} from '@chakra-ui/react'
import {StaticImage} from 'gatsby-plugin-image'
import {GCImage} from '../../GCImage'
import {Link as GatsbyLink} from 'gatsby'

export interface BannerLayoutProps {
  title: string
  path: string
}

export const BreadcrumbsBanner = ({title, path}: BannerLayoutProps) => {
  return (
    <Box position={'relative'} color="white" h="fit-content">
      <GCImage
        gimg={
          <StaticImage
            src="https://i.imgur.com/8zG2Ymd.jpeg"
            alt="Banner with title and breadcrumbs"
            imgStyle={{
              width: '100%',
              height: '200px',
              objectFit: 'cover'
            }}
          />
        }
      />

      <Flex
        position={'absolute'}
        top="5"
        w="100%"
        justifyContent={'center'}
        alignItems={'center'}>
        <Box w="8xl">
          <Breadcrumbs path={path} />
          <Heading size="2xl" my="8">
            {title}
          </Heading>
        </Box>
      </Flex>
    </Box>
  )
}

export const Breadcrumbs = (props: {path: string}) => {
  const pathParts = props.path.split('/').filter(Boolean)
  const pathLength = pathParts.length

  const breadcrumbs = pathParts.map((item, index) => {
    const isLast = index === pathLength - 1
    const isExeption = item === 'collections' || isLast

    switch (item) {
      case 'collections':
        item = 'Kategorien'
        break
      case 'products':
        item = 'Produkte'
        break
    }

    let capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1)

    return (
      <BreadcrumbItem key={item}>
        {isExeption ? (
          <Text>{capitalizedItem}</Text>
        ) : (
          <BreadcrumbLink
            as={GatsbyLink}
            to={`/${pathParts.slice(0, index + 1).join('/')}`}>
            {capitalizedItem}
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    )
  })

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      my={4}>
      <BreadcrumbItem>
        <BreadcrumbLink as={GatsbyLink} to="/">
          <Icon as={FaHome} />
        </BreadcrumbLink>
      </BreadcrumbItem>
      {breadcrumbs}
    </Breadcrumb>
  )
}
