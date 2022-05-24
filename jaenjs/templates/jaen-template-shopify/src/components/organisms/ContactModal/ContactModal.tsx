import React from 'react'
import {Button, IconButton} from '@chakra-ui/button'
import {Input} from '@chakra-ui/input'
import {Text, Box, Heading, Flex} from '@chakra-ui/layout'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/modal'
import {useToast} from '@chakra-ui/toast'
import {FormControl, FormErrorMessage, FormLabel} from '@chakra-ui/form-control'
import {Checkbox} from '@chakra-ui/checkbox'
import {Textarea} from '@chakra-ui/textarea'

import {useForm} from 'react-hook-form'
import {sendEmail} from '../../../services/sendMail'
import * as styles from './styles'


export interface ContactModalProps {
  isOpen: boolean
  heading: React.ReactNode
  text: React.ReactNode
  onClose: Function
  wishlist: {
    title: string
    quantity: number
  }[]
}

export const ContactModal = ({
  isOpen,
  heading,
  text,
  wishlist,
  onClose
}: ContactModalProps) => {
  const toast = useToast()
  const generateEmailContent = () => {
    const wishlistText = wishlist
      .map(item => {
        return `- ${item.quantity} x ${item.title}`
      })
      .join('\n')

    const content = `Sehr geehrtes AGT Team,
ich würde gerne ein Kaufangebot für folgende Artikel einholen:

${wishlistText}


Mit freundlichen Grüßen!
    `

    return content
  }

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: generateEmailContent(),
    agbChecked: false
  }

  const {
    handleSubmit,
    reset,
    register,
    formState: {errors, isSubmitting}
  } = useForm<typeof defaultValues>({
    defaultValues
  })

  React.useEffect(() => {
    reset(defaultValues)
  }, [wishlist])

  const onSubmit = async (data: typeof defaultValues) => {
    const {firstName, lastName, email, message} = data

    const subject = `Kaufanfrage für ${wishlist
      .map(item => item.title)
      .join(', ')}`

    const body = `
Anfrage von ${firstName} ${lastName} (${email}) über AGT Shop.

<== Inhalt der Anfrage ==>

${message}
`

    await sendEmail({
      fromEmail: email,
      name: `${firstName} ${lastName}`,
      subject,
      message: body
    })

    toast({
      title: 'Anfrage erfolgreich versendet',
      description:
        'Vielen Dank für Ihre Anfrage. Wir werden uns so schnell wie möglich bei Ihnen melden.',
      status: 'success',
      duration: 9000,
      isClosable: true
    })

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
      }}
      isCentered
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        bg="primary"
        borderRadius="5px"
        minH="60vh"
        maxW={{base: '90vw', md: '64vw', xl: '60vw'}}>
        <ModalHeader ml="5" fontWeight={'bold'}>
          {heading}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mx="5" mb="5">
          <Text mb="3">{text}</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex mb="3" direction={{base: 'column', md: 'row'}}>
              <Box mr="5" w={{base: '100%', md: '50%'}}>
                <FormControl isInvalid={!!errors.firstName}>
                  <FormLabel htmlFor="first-name">Vorname</FormLabel>
                  <Input
                    bg="white"
                    placeholder="Max"
                    {...register('firstName', {required: true})}
                    borderColor="#D4D4D9"
                  />
                </FormControl>
              </Box>
              <Box w={{base: '100%', md: '50%'}}>
                <FormControl isInvalid={!!errors.lastName}>
                  <FormLabel htmlFor="last-name">Nachname</FormLabel>
                  <Input
                    bg="white"
                    placeholder="Mustermann"
                    {...register('lastName', {required: true})}
                    borderColor="#D4D4D9"
                  />
                </FormControl>
              </Box>
            </Flex>

            <Box mb="3">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email Adresse</FormLabel>
                <Input
                  bg="white"
                  placeholder="max.mustermann@example.at"
                  {...register('email', {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                  })}
                  borderColor="#D4D4D9"
                />
              </FormControl>
            </Box>
            <Box mb="5">
              <FormControl isInvalid={!!errors.message}>
                <FormLabel htmlFor="message">Nachricht</FormLabel>
                <Textarea
                  bg="white"
                  resize="vertical"
                  borderColor="#D4D4D9"
                  h="30vh"
                  {...register('message', {required: true})}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={!!errors.agbChecked}>
                <Flex>
                  <Checkbox
                    {...register('agbChecked', {required: true})}
                    borderColor="#D4D4D9"
                    bg="white"
                    h="fit-content"
                    mt="0.5"
                    mr="2"
                  />
                  <Text mt={'-2px'}>
                    Ich habe die AGBs gelesen und stimme der Verarbeitung meiner
                    Daten zu.
                  </Text>
                </Flex>
                {errors.agbChecked && (
                  <FormErrorMessage>
                    Bitte akzeptieren Sie die AGBs
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                mt="4"
                colorScheme="agt.grayScheme"
                type="submit"
                isLoading={isSubmitting}>
                Absenden
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ContactModal
