import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react'
import * as React from 'react'

export interface PublishAlertProps {
  onConfirm: () => Promise<boolean>
  isOpen: boolean
  onClose: () => void
}

export const DiscardAlert = ({
  onConfirm,
  isOpen,
  onClose
}: PublishAlertProps) => {
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
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Discard chances?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to discard all of your changes? <i>44</i>{' '}
          changes will be deleted.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme={'red'}
            onClick={handleConfirm}
            ml={3}
            isLoading={isLoading}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DiscardAlert
