import {
  Box,
  CloseButton,
  Divider,
  Flex,
  HStack,
  Link,
  Spacer,
  Text,
  Tooltip
} from '@chakra-ui/react'
import React from 'react'
import {JaenLogo} from './icons'

export interface JaenActivationButtonProps {
  onClick: () => void
}

export const JaenActivationButton = (props: JaenActivationButtonProps) => {
  const [isClicked, setIsClicked] = React.useState(false)

  const divider = <Divider orientation="vertical" borderColor="gray.500" />

  if (isClicked) {
    return (
      <HStack
        spacing={6}
        h={{
          md: 16,
          base: 24
        }}
        w="full"
        px={4}
        py={2}
        position={'fixed'}
        bottom={0}
        bg="gray.900"
        color="white"
        alignItems="center">
        <Flex
          h="full"
          w="auto"
          cursor="pointer"
          justifyContent={'space-around'}
          align="center"
          gap={2}
          py={{
            md: 0,
            base: 2
          }}
          onClick={props.onClick}>
          <JaenLogo h="full" w="auto" />
          <Text
            fontSize="sm"
            fontWeight="bold"
            display={{
              base: 'none',
              md: 'block'
            }}>
            Snek Jaen
          </Text>
        </Flex>

        {divider}

        <Box>
          <Text fontSize="sm">
            This site is powered by Snek Jaen. Visit the{' '}
            <Link
              onClick={props.onClick}
              textDecoration={'underline'}
              _hover={{
                color: 'gray.300'
              }}>
              admin panel
            </Link>{' '}
            to edit this site.
          </Text>
        </Box>
        <Spacer />

        <HStack h="full">
          {divider}

          <CloseButton
            size={'lg'}
            color="white"
            _hover={{
              bg: 'gray.700'
            }}
            onClick={() => setIsClicked(false)}
          />
        </HStack>
      </HStack>
    )
  }

  return (
    <Tooltip hasArrow label="Activate Jaen" bg="gray.300" color="black">
      <JaenLogo
        zIndex={9999}
        cursor={'pointer'}
        boxSize={'14'}
        position={'fixed'}
        left="5"
        bottom="5"
        onClick={() => setIsClicked(true)}
      />
    </Tooltip>
  )
}

export default JaenActivationButton
