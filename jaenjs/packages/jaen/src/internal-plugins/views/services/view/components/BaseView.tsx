import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text
} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons'
import {Link} from 'react-router-dom'
import {IViewConnection} from '../context'
import {DividerWithText} from '../../../../../ui/components/AdminLogin/DividerWithText'

const Breadcrums = () => {
  const path = (
    typeof window !== 'undefined' ? window.location.hash : ''
  ).replace('#', '')

  const paths = path.split('/').filter(Boolean)

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {paths.map((name, index) => {
        // capitalize first letter
        const label = name.charAt(0).toUpperCase() + name.slice(1)
        const itemPath = `/${paths.slice(0, index + 1).join('/')}`

        return (
          <BreadcrumbItem key={index}>
            {index === 0 ? (
              <Text as="span" fontWeight="bold">
                {label}
              </Text>
            ) : (
              <BreadcrumbLink
                to={itemPath}
                as={Link}
                isCurrentPage={index === paths.length - 1}>
                {label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export const BaseView = (props: {
  title: string
  description: string
  controls?: React.ReactNode[]
  children: React.ReactNode
}) => {
  return (
    <Stack h="85vh">
      <Breadcrums />
      <Flex>
        <Heading>{props.title}</Heading>
        {props.controls && (
          <>
            <Spacer />
            <Box m="2">
              {props.controls.map(control => (
                <>{control}</>
              ))}
            </Box>
          </>
        )}
      </Flex>
      <DividerWithText>{props.description}</DividerWithText>
      <Box maxWidth="100%" width="100%" h={'70vh'} px="4" py="6">
        {props.children}
      </Box>
    </Stack>
  )
}

export const withBaseView = (Component: IViewConnection) => {
  return (props: any) => {
    return (
      <BaseView
        title={Component.options.displayName}
        description={Component.options.description}
        controls={Component.options.controls}>
        <Component {...props} />
      </BaseView>
    )
  }
}
