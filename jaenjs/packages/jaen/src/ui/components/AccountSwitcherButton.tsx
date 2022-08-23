import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  useMenuButton
} from '@chakra-ui/react'
import {HiSelector} from '@react-icons/all-files/hi/HiSelector'
import * as React from 'react'

export interface AccountSwitcherButtonProps extends FlexProps {
  name: string
  imageSrc: string
  iconRight?: React.ReactNode
}

export const AccountSwitcherButton: React.FC<AccountSwitcherButtonProps> = ({
  iconRight,
  imageSrc,
  ...props
}) => {
  const buttonProps = useMenuButton(props)
  return (
    <Flex
      as="button"
      {...buttonProps}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="white"
      color="black"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _hover={{
        bg: 'gray.200'
      }}
      _active={{bg: 'gray.200'}}
      _focus={{shadow: 'outline'}}>
      <HStack flex="1" spacing="3">
        <Avatar boxSize={5} rounded="md" objectFit="cover" src={imageSrc} />

        <Box textAlign="start">
          <Box noOfLines={1}>{props.name}</Box>
        </Box>
      </HStack>

      <Box fontSize="lg" color="gray.400">
        <HiSelector />
      </Box>
      {iconRight && <Box mx="2">{iconRight}</Box>}
    </Flex>
  )
}
