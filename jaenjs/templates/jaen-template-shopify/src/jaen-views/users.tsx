import {connectView} from '@jaenjs/jaen'
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation
} from 'react-router-dom'
import {FaUser} from '@react-icons/all-files/fa/FaUser'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Text,
  useColorModeValue,
  Checkbox,
  Box,
  HStack,
  ButtonGroup,
  FormErrorMessage,
  InputProps,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  ButtonProps,
  useToast,
  Spinner,
  Center,
  Link,
  Stack
} from '@chakra-ui/react'
import {AddIcon, CheckCircleIcon, EditIcon, Icon} from '@chakra-ui/icons'
import {Controller, useForm} from 'react-hook-form'
import React from 'react'
import usersGet from '../snek-functions/usersGet'
import usersAdd from '../snek-functions/usersAdd'
import usersUpdate from '../snek-functions/usersUpdate'
import usersDelete from '../snek-functions/usersDelete'

const UsersList = () => {
  const textColor = useColorModeValue('gray.700', 'white')

  const navigate = useNavigate()

  const {users, isLoading, clearCacheAndFetch} = useUsers()

  return (
    <>
      <Stack overflowY={'auto'} height="100%">
        <Table variant={'simple'}>
          <Thead position="sticky" top={0} bgColor={'white'} zIndex={1}>
            <Tr my=".8rem" pl="0px">
              <Th pl="0px" color="gray.400">
                Id
              </Th>
              <Th color="gray.400">E-Mail</Th>
              <Th color="gray.400">Name</Th>
              <Th color="gray.400">Created at</Th>
              <Th color="gray.400">Active</Th>

              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr>
                <Td p={1}>
                  <Text fontSize="sm" color={textColor} textAlign={'left'}>
                    {index + 1}
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="sm" color={textColor}>
                    {user.email}
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="sm" color={textColor}>
                    {user.fullName}
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="sm" color={textColor}>
                    {new Date(user.createdAt).toDateString()}
                  </Text>
                </Td>
                <Td>{user.isActive ? <CheckCircleIcon /> : null}</Td>
                <Td textAlign={'right'}>
                  <Button
                    p="0px"
                    bg="transparent"
                    onClick={() => navigate((index + 1).toString())}>
                    <Icon as={EditIcon} color="gray.400" cursor="pointer" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Link fontSize="sm" color={textColor} onClick={clearCacheAndFetch}>
          <HStack>
            <Text>Refresh</Text>
            {isLoading && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="agt.blue"
                size="sm"
              />
            )}
          </HStack>
        </Link>
      </Stack>
    </>
  )
}

const AlertDialogButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    alertHeader: string
    alertBody: string
    alertFooter: {
      confirmButton: string
      cancelButton: string
    }
  }
>(({onClick, alertFooter, alertBody, alertHeader, ...rest}, ref) => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const cancelRef = React.useRef<any>()

  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClose()
    onClick?.(e)
  }

  return (
    <>
      <Button
        ref={ref}
        onClick={onOpen}
        colorScheme="blue"
        variant="outline"
        {...rest}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {alertHeader}
            </AlertDialogHeader>

            <AlertDialogBody>{alertBody}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {alertFooter.cancelButton}
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                {alertFooter.confirmButton}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
})

const UserDetails = () => {
  const params = useParams()

  const index = params.index

  if (!index) {
    return null
  }

  const navigate = useNavigate()

  const {users, isFetching, updateUser, deleteUser} = useUsers()

  const user = users[parseInt(index) - 1]

  const [changePasword, setChangePassword] = React.useState(false)

  type FormValues = {
    fullName: string
    email: string
    isActive: boolean
    password?: string
  }

  const defaultValues = user
    ? {
        fullName: user.fullName,
        email: user.email,
        isActive: user.isActive
      }
    : {}

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: {errors, isSubmitting, isDirty, isValid}
  } = useForm<FormValues>({
    defaultValues
  })

  const onReset = () => {
    reset(defaultValues)

    setChangePassword(false)
  }

  const onSubmit = async (values: FormValues) => {
    // Get diff between old and new values typescript

    const diff: any = {}

    Object.keys(values).forEach(key => {
      if ((values as any)[key] !== (defaultValues as any)[key]) {
        diff[key] = (values as any)[key]
      }
    })

    const ok = await updateUser({id: user.id, ...diff})

    if (ok) {
      reset(values)
      setChangePassword(false)
    }
  }

  const handleDelete = async () => {
    const ok = await deleteUser(user.id)

    if (ok) {
      navigate(-1)
    }
  }

  React.useEffect(() => {
    onReset()
  }, [user])

  if (!user) {
    if (isFetching) {
      return <Text>Loading</Text>
    }

    return <Text>User not found</Text>
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>E-Mail</FormLabel>
          <Input
            isDisabled
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

        <FormControl mt={4} isInvalid={!!errors.fullName}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Max Mustermann"
            {...register('fullName', {
              required: 'This is required'
            })}
          />
          <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          {changePasword ? (
            <PasswordInput
              {...register('password', {
                required: 'This is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
                }
              })}
            />
          ) : (
            <Button onClick={() => setChangePassword(true)}>Change </Button>
          )}
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.isActive}>
          <FormLabel>Active</FormLabel>
          <Controller
            control={control}
            name="isActive"
            defaultValue={user.isActive}
            render={({field: {value, onChange, onBlur, ref}}) => (
              <Switch
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                isChecked={value}
              />
            )}
          />
          <FormErrorMessage>{errors.isActive?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Created at</FormLabel>
          <Input
            placeholder={new Date(user.createdAt).toDateString()}
            disabled
          />
        </FormControl>

        <Box mt={8}>
          <HStack width="full">
            <ButtonGroup isDisabled={!isDirty}>
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={onReset}>
                Cancel
              </Button>
            </ButtonGroup>
            <AlertDialogButton
              onClick={handleDelete}
              colorScheme="red"
              variant="outline"
              alertHeader="Delete user"
              alertBody="Are you sure? You can't undo this action afterwards."
              alertFooter={{
                cancelButton: 'Cancel',
                confirmButton: 'Delete'
              }}>
              Delete
            </AlertDialogButton>
          </HStack>
        </Box>
      </form>
      <Text fontSize="sm" color="gray.400" textAlign={'right'}>
        {user.id}
      </Text>
    </Box>
  )
}

const useDidMountEffect = (
  func: {(): void; (): void},
  deps: React.DependencyList | undefined
) => {
  const didMount = React.useRef(false)

  React.useEffect(() => {
    if (didMount.current) {
      func()
    } else {
      didMount.current = true
    }
  }, deps)
}

const useUsers = () => {
  type Cache = {
    users: Array<{
      id: string
      fullName: string
      email: string
      isActive: boolean
      createdAt: string
    }>
    timestamp: number
  }

  const toast = useToast()

  const [isFetching, setIsFetching] = React.useState(true)

  const [isLoading, setIsLoading] = React.useState(true)

  const [users, setUsers] = React.useState<Cache['users']>([])

  React.useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      const fetchedUsers = (await usersGet()) || []

      setIsFetching(false)
      setUsers(fetchedUsers)
      setIsLoading(false)
    }

    // check local storage for users

    const cache: Cache | null =
      JSON.parse(localStorage.getItem('users') || '{}') || null

    console.log('try to refetch', cache)

    // check if timestamp is older than 1 minute or if no cache is available

    if (!cache?.timestamp || (cache && Date.now() - cache.timestamp > 60000)) {
      fetchUsers()
    } else {
      setUsers(cache.users)
      setIsLoading(false)
      console.log('using cache', cache)
    }
  }, [isFetching])

  React.useEffect(() => {
    // cache users in local storage with timestamp
    console.log('caching users', users)

    if (!isLoading) {
      localStorage.setItem(
        'users',
        JSON.stringify({timestamp: Date.now(), users})
      )
    }
  }, [isLoading, users])

  const clearCacheAndFetch = React.useCallback(() => {
    localStorage.removeItem('users')

    setIsFetching(true)
  }, [])

  const checkErrors = (errors: Array<{message: string}>) => {
    if (errors.length > 0) {
      toast({
        title: 'Error',
        description: errors[0].message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }

    return errors.length === 0
  }

  const addUser = async (user: {
    email: string
    fullName: string
    password: string
  }) => {
    const {data, errors} = await usersAdd.execute(user)

    const ok = checkErrors(errors)

    if (ok) {
      setUsers([...users, data])

      toast({
        title: 'Success',
        description: 'User added',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    }

    return ok
  }

  const updateUser = async (user: {
    id: string
    email?: string
    fullName?: string
    password?: string
    isActive?: boolean
  }) => {
    const {errors} = await usersUpdate.execute(user)

    const ok = checkErrors(errors)

    if (ok) {
      setUsers(
        users.map(u =>
          u.id === user.id
            ? {
                ...u,
                ...user
              }
            : u
        )
      )

      toast({
        title: 'Success',
        description: 'User updated',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    }

    return ok
  }

  const deleteUser = async (id: string) => {
    const {errors} = await usersDelete.execute({
      id
    })

    const ok = checkErrors(errors)

    if (ok) {
      setUsers(users.filter(u => u.id !== id))

      toast({
        title: 'Success',
        description: 'User deleted',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    }

    return ok
  }

  return {
    users,
    clearCacheAndFetch,
    addUser,
    updateUser,
    deleteUser,

    isFetching,
    isLoading
  }
}

const UsersView = () => {
  // fetch users only

  return (
    <>
      <Routes>
        <Route index element={<UsersList />} />
        <Route path=":index" element={<UserDetails />} />
      </Routes>
    </>
  )
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

const AddUserControl = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const toast = useToast()

  const navigate = useNavigate()

  const {addUser} = useUsers()

  const initialRef = React.useRef<HTMLInputElement | null>(null)
  const finalRef = React.useRef()

  type FormValues = {
    fullName: string
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
    const ok = await addUser({
      email: values.email,
      fullName: values.fullName,
      password: values.password
    })

    if (ok) {
      handleClose()

      // reload page
      navigate('')
    }
  }

  // return null if path not on /users but on /users/:index
  const {pathname} = useLocation()

  if (pathname !== '/views/users') {
    return null
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add a user</ModalHeader>
            <ModalCloseButton onClick={handleClose} />
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

              <FormControl mt={4} isInvalid={!!errors.fullName}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Max Mustermann"
                  {...register('fullName', {
                    required: 'This is required'
                  })}
                />
                <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <PasswordInput
                  {...register('password', {
                    required: 'This is required',
                    pattern: {
                      value: /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/,
                      message:
                        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
                    }
                  })}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup isDisabled={!isDirty}>
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}>
                  Create
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Button leftIcon={<AddIcon />} onClick={onOpen}>
        Add User
      </Button>
    </>
  )
}

export default connectView(UsersView, {
  path: '/users',
  displayName: 'Großhandelskunden',
  description:
    'Hier sind alle Benutzer aufgelistet, die Zugriff auf diese Seite haben.',
  Icon: FaUser,
  controls: [<AddUserControl />]
})
