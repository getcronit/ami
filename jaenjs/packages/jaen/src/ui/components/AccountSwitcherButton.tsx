import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Img,
  useMenuButton
} from '@chakra-ui/react'
import * as React from 'react'
import {HiSelector} from 'react-icons/hi'

export interface AccountSwitcherButtonProps extends FlexProps {
  name: string
  imageSrc: string
}

export const AccountSwitcherButton: React.FC<AccountSwitcherButtonProps> = props => {
  const buttonProps = useMenuButton(props)
  return (
    <Flex
      as="button"
      {...buttonProps}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="gray.700"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _active={{bg: 'gray.600'}}
      _focus={{shadow: 'outline'}}>
      <HStack flex="1" spacing="3">
        <Img
          w="4"
          h="4"
          rounded="md"
          objectFit="cover"
          src={props.imageSrc}
          alt=""
        />
        <Box textAlign="start">
          <Box isTruncated fontWeight="semibold">
            {props.name}
          </Box>
        </Box>
      </HStack>
      <Box fontSize="lg" color="gray.400">
        <HiSelector />
      </Box>
    </Flex>
  )
}
