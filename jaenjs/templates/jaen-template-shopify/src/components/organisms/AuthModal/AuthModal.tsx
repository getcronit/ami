import {AddIcon} from '@chakra-ui/icons'
import {
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  ModalFooter,
  ButtonGroup,
  Button
} from '@chakra-ui/react'
import React from 'react'

import {useForm} from 'react-hook-form'

export interface AuthModalProps {
  isOpen: boolean
  user?: {
    fullName: string
    email: string
  }
  onClose: () => void
  onLogin: (values: {email: string; password: string}) => Promise<boolean>
  onLogout: () => void
}

const PasswordInput = React.forwardRef<HTMLInputElement, any>(
  ({register, ...props}, ref) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
      <InputGroup size="md">
        <Input
          ref={ref}
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          {...props}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }
)

export const AuthModal = ({
  isOpen,
  onClose,
  onLogin,
  onLogout,
  user
}: AuthModalProps) => {
  const toast = useToast()

  const initialRef = React.useRef<HTMLInputElement | null>(null)

  type FormValues = {
    email: string
    password: string
  }

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: {errors, isSubmitting, isDirty, isValid}
  } = useForm<FormValues>({})

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (values: FormValues) => {
    const ok = await onLogin(values)

    if (ok) {
      toast({
        title: 'Anmeldung erfolgreich',
        description: 'Sie sind jetzt angemeldet.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })

      handleClose()
    } else {
      toast({
        title: 'Anmeldung fehlgeschlagen',
        description: 'Der Benutzername oder das Passwort ist falsch.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleLogout = () => {
    onLogout()

    toast({
      title: 'Abmeldung erfolgreich',
      description: 'Sie sind jetzt abgemeldet.',
      status: 'success',
      duration: 9000,
      isClosable: true
    })

    handleClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Großhandels Zugang</ModalHeader>
          <ModalCloseButton onClick={handleClose} />

          {user ? (
            <>
              <ModalBody pb={6}>
                <p>
                  Sie sind angemeldet als <strong>{user.fullName}</strong> {'<'}
                  {user.email}
                  {'>'}.
                </p>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="agt.redScheme" onClick={handleLogout}>
                  Abmelden
                </Button>
              </ModalFooter>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody pb={6}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>E-Mail</FormLabel>
                  <Input
                    placeholder="max.mustermann@snek.at"
                    {...register('email', {
                      required: 'This is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <PasswordInput
                    {...register('password', {
                      required: 'This is required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <ButtonGroup isDisabled={!isDirty}>
                  <Button
                    type="submit"
                    colorScheme="agt.blueScheme"
                    isLoading={isSubmitting}>
                    Anmelden
                  </Button>
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal
