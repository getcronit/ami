import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import * as React from 'react'
import {JaenLogo} from '../../icons'

export interface IncomingBuildAlertProps {
  onConfirm: () => Promise<boolean>
  isOpen: boolean
  onClose: () => void
  totalChanges: number
}

// window.___webpackCompilationHash

export const IncomingBuildAlert = ({
  onConfirm,
  isOpen,
  onClose,
  totalChanges
}: IncomingBuildAlertProps) => {
  const cancelRef = React.useRef<any>()

  const [isLoading, setIsLoading] = React.useState(false)

  const toast = useToast()

  const handleConfirm = async () => {
    setIsLoading(true)

    const confirmed = await onConfirm()

    setIsLoading(false)
    if (confirmed) {
      toast({
        title: 'Success',
        description:
          'Your changes have been discarded. You are now in view mode.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

      onClose()
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <AlertDialog
      size={'xl'}
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogCloseButton />
        <AlertDialogBody px={8} pt={12} pb={4}>
          <VStack textAlign={'center'} spacing={4}>
            <JaenLogo boxSize="16" mb={2} />
            <Heading size="md" fontWeight="bold">
              New version is now available
            </Heading>
            <Text>
              There is a new version of the website available. You can either
              update to the latest version and discard your changes or you can
              continue working on your changes.
            </Text>
            <Divider />
            <Text fontSize="sm">
              <strong>Note:</strong> {totalChanges} changes have been made since
              the last published version.
            </Text>
            <Text fontSize="sm">
              <strong>Warning:</strong> When not updating, publishing your
              changes might result in overwriting data of the latest version.
            </Text>
          </VStack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <HStack spacing={6}>
            <Button
              colorScheme={'teal'}
              isLoading={isLoading}
              onClick={handleConfirm}
              size="lg"
              mr={4}
              mb={4}>
              Update
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default IncomingBuildAlert
