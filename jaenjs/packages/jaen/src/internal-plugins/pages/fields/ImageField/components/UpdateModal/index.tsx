import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { useSnekFinder } from '@jaenjs/snek-finder'
import * as React from 'react'
import { useForm } from 'react-hook-form'

type FormData = Partial<{
  image: string
  title: string
  description: string
}>

export interface UpdateModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (data: FormData) => void
  onDelete: () => void
  data: FormData
}

export const UpdateModal = ({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  data
}: UpdateModalProps) => {
  const toast = useToast()

  const [defaultValues, setDefaultValues] = React.useState(data)

  React.useEffect(() => {
    setDefaultValues(data)
    reset(data)
  }, [data])

  const {
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting, isDirty}
  } = useForm<FormData>({
    defaultValues
  })

  const finder = useSnekFinder({
    mode: 'selector',
    onSelect: ({src, name, description}) => {
      onUpdate({
        image: src,
        title: name,
        description: description || ''
      })
    }
  })

  const handleDelete = () => {
    onDelete()

    toast({
      title: 'Deleted',
      description: 'The image has been cleared from the field.',
      status: 'success',
      duration: 5000,
      isClosable: true
    })

    onClose()
  }

  const onSubmit = (values: FormData) => {
    onUpdate(values)

    toast({
      title: 'Success',
      description: 'The image has been updated',
      status: 'success',
      duration: 5000,
      isClosable: true
    })

    onClose()
  }

  const handleImageClick = () => {
    finder.toggleSelector()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
      {finder.finderElement}
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Update Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box flex="1" p="4">
                <FormControl isRequired isInvalid={!!errors.title}>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    placeholder="Title"
                    {...register('title', {
                      required: 'This is required',
                      maxLength: {value: 80, message: 'Max length is 80'}
                    })}
                  />
                  <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.description}>
                  <FormLabel htmlFor="description">Description (alt)</FormLabel>
                  <Textarea
                    maxH="15vh"
                    placeholder="Description"
                    {...register('description', {
                      required: 'This is required',
                      maxLength: {value: 140, message: 'Max length is 140'}
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.description?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Image
                h="300px"
                w="300px"
                cursor={isSubmitting ? 'not-allowed' : 'pointer'}
                objectFit={'cover'}
                src={data.image}
                onClick={handleImageClick}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr="4" colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>

            <Button
              colorScheme="blue"
              mr={4}
              isLoading={isSubmitting}
              isDisabled={!isDirty}
              type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default UpdateModal
