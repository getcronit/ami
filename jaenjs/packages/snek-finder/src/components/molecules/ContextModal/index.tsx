import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import {useForm} from 'react-hook-form'

export type ContextModalProps = {
  isOpen: boolean
  title: string
  inputPlaceholder: string
  inputText?: string
  finishBtnLabel?: string
  cancelBtnLabel?: string
  onFinish: (input: string) => void
  onClose: () => void
  onCancel: () => void
}

type FormValues = {
  input: string
}

const ContextModal: React.FC<ContextModalProps> = props => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors, isSubmitting}
  } = useForm<FormValues>({
    defaultValues: {
      input: props.inputText
    }
  })

  const onSubmit = (data: FormValues) => {
    props.onFinish(data.input)
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>{props.title} test</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!errors.input}>
                <Input
                  placeholder={props.inputPlaceholder}
                  {...register('input', {required: 'Input is required'})}
                />
                {errors.input && (
                  <FormErrorMessage>{errors.input.message}</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isSubmitting}>
                {props.finishBtnLabel || 'Save'}
              </Button>
              <Button onClick={props.onCancel} type="reset">
                {props.cancelBtnLabel || 'Cancel'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ContextModal
