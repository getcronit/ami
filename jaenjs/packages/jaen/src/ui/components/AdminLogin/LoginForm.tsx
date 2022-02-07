import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack
} from '@chakra-ui/react'
import * as React from 'react'
import {PasswordField} from './PasswordField'

export interface LoginFormProps extends HTMLChakraProps<'form'> {
  onLogin: (email: string, password: string) => void
}

export const LoginForm = (props: LoginFormProps) => (
  <chakra.form
    onSubmit={e => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value

      props.onLogin(email, password)
    }}
    {...props}>
    <Stack spacing="6">
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          required
          focusBorderColor="teal.500"
        />
      </FormControl>
      <PasswordField focusBorderColor="teal.500" />
      <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
        Sign in
      </Button>
    </Stack>
  </chakra.form>
)
