import React from 'react'
import {
  FormControl,
  Flex,
  Box,
  BoxProps,
  FormLabel,
  Input,
  Select,
  Textarea,
  Checkbox,
  Button,
  useToast
} from '@chakra-ui/react'
import {Controller, useForm} from 'react-hook-form'

import {sendEmail} from '../../../services/sendMail'

type FormData = {
  name: string
  lastname: string
  email: string
  requestOption: string
  message: string
  agbChecked: boolean
}

interface IProps extends BoxProps {
  requestOptions?: string[]
}

export const ContactForm = ({
  requestOptions = ['Option 1', 'Option 2', 'Option 3'],
  ...props
}: IProps) => {
  const toast = useToast()

  const defaultValues: FormData = {
    name: '',
    lastname: '',
    email: '',
    requestOption: '',
    message: '',
    agbChecked: false
  }

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: {errors, isSubmitting}
  } = useForm<typeof defaultValues>({
    defaultValues
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)

    const {name, lastname, email, requestOption, message} = data

    const subject = `Anfrage (${requestOption}) über AGT Shop`

    const body = `
Anfrage von ${name} ${lastname} (${email}) über AGT Shop.

<== Inhalt der Anfrage ==>

${message}
`

    await sendEmail({
      fromEmail: email,
      name: `${name} ${lastname}`,
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

    reset()
  }

  return (
    <Box {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mb="3" direction={{base: 'column', md: 'row'}}>
          <Box mr="5" w={{base: '100%', md: '50%'}}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="first-name">Vorname</FormLabel>
              <Input
                id="first-name"
                placeholder="Max"
                bg="primary"
                borderColor="#D4D4D9"
                {...register('name', {required: true})}
              />
            </FormControl>
          </Box>
          <Box w={{base: '100%', md: '50%'}}>
            <FormControl isInvalid={!!errors.lastname}>
              <FormLabel htmlFor="last-name">Nachname</FormLabel>
              <Input
                id="last-name"
                placeholder="Mustermann"
                bg="primary"
                borderColor="#D4D4D9"
                {...register('lastname', {required: true})}
              />
            </FormControl>
          </Box>
        </Flex>
        <Flex direction={{base: 'column', md: 'row'}}>
          <Box w={{base: '100%', md: '50%'}} mr="5">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email Adresse</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="max.mustermann@example.at"
                bg="primary"
                borderColor="#D4D4D9"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                })}
              />
            </FormControl>
          </Box>
          <Box w={{base: '100%', md: '50%'}}>
            <FormControl isInvalid={!!errors.requestOption}>
              <FormLabel htmlFor="request-type">
                Welches Anliegen haben Sie?
              </FormLabel>
              <Controller
                name="requestOption"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <Select
                    placeholder="Bitte auswählen"
                    bg="primary"
                    borderColor="#D4D4D9"
                    {...field}>
                    {requestOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
        </Flex>
        <Box mt="3">
          <FormControl isInvalid={!!errors.message}>
            <FormLabel htmlFor="message">Nachricht</FormLabel>
            <Textarea
              resize="vertical"
              bg="primary"
              borderColor="#D4D4D9"
              maxH="45vh"
              {...register('message', {required: true})}
            />
          </FormControl>
        </Box>
        <Box>
          <Flex my="3">
            <FormControl isInvalid={!!errors.agbChecked}>
              <Checkbox
                borderColor="#D4D4D9"
                h="fit-content"
                mt="0.5"
                mr="2"
                {...register('agbChecked', {required: true})}>
                Ich habe die AGBs gelesen und stimme der Verarbeitung meiner
                Daten zu.
              </Checkbox>
            </FormControl>
          </Flex>
          <Button
            colorScheme="agt.grayScheme"
            color="white"
            type="submit"
            isLoading={isSubmitting}>
            Absenden
          </Button>
        </Box>
      </form>
    </Box>
  )
}
