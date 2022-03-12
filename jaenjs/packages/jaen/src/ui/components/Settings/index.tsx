import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack
} from '@chakra-ui/react'
import * as React from 'react'
import {HiCloudUpload} from 'react-icons/hi'
import {FieldGroup} from './FieldGroup'
import {LanguageSelect} from './LanguageSelect'

import {Controller, useForm} from 'react-hook-form'
import {ISite} from '../../../types'
import {useSnekFinder} from '@jaenjs/snek-finder'

type FormDataType = ISite

export interface SettingsTabProps {
  data: FormDataType
  onUpdate: (data: FormDataType) => void
}

export const SettingsTab = ({data, onUpdate}: SettingsTabProps) => {
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
    setValue,
    control,
    formState: {errors, isSubmitting, isDirty, isValid}
  } = useForm<FormDataType>({
    defaultValues
  })

  const [finderReference, setFinderReference] = React.useState<any | null>(null)

  const finder = useSnekFinder({
    mode: 'selector',
    onAction: action => {
      if (action.type === 'SELECTOR_SELECT') {
        const imageUrl = action.payload.item.src

        if (finderReference) {
          setValue(finderReference, imageUrl, {
            shouldDirty: true
          })

          setFinderReference(null)
        }
      }
    }
  })

  const handleSiteImageUpload = () => {
    setFinderReference('siteMetadata.image')
    finder.toggleSelector()
  }

  const handleSiteImageDelete = () => {
    setValue('siteMetadata.image', '', {
      shouldDirty: true
    })
  }

  const handleOrganizationLogoUpload = () => {
    setFinderReference('siteMetadata.organization.logo')
    finder.toggleSelector()
  }

  const handleOrganizationLogoDelete = () => {
    setValue('siteMetadata.organization.logo', '', {
      shouldDirty: true
    })
  }

  const disabled = !isDirty || !isValid

  const onSubmit = (values: FormDataType) => {
    onUpdate(values)

    setDefaultValues(values)
    reset(values)

    toast({
      title: 'Saved',
      description: 'Your changes have been saved.',
      status: 'success',
      duration: 5000
    })
  }

  const onReset = () => {
    reset(defaultValues)
  }

  const currentWindowUrl =
    typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      {finder.finderElement}
      <Box py="8" maxWidth="4xl" mx="auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Settings
          </Heading>
          <Divider />
          <Stack
            h="60vh"
            spacing="4"
            divider={<StackDivider />}
            overflowY="scroll"
            px={{base: '4', md: '10'}}>
            <FieldGroup title="Site Info">
              <VStack width="full" spacing="6">
                <FormControl
                  isRequired
                  isInvalid={!!errors?.siteMetadata?.title}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    {...register('siteMetadata.title', {
                      required: 'Title is required',
                      maxLength: {value: 100, message: 'Title is too long'}
                    })}
                  />
                  <FormErrorMessage>
                    {errors.siteMetadata?.title?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={!!errors?.siteMetadata?.siteUrl}>
                  <FormLabel>Url</FormLabel>
                  <Input
                    placeholder={currentWindowUrl}
                    {...register('siteMetadata.siteUrl', {
                      required: 'Url is required',
                      validate: {
                        checkUrl: value =>
                          value && !/^https?:\/\//.test(value)
                            ? 'Url must start with http:// or https://'
                            : undefined
                      }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.siteMetadata?.siteUrl?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors?.siteMetadata?.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    rows={5}
                    placeholder="The description will be showed in SEO results on pages without their own descriptions."
                    {...register('siteMetadata.description')}
                  />
                  {!errors.siteMetadata?.description && (
                    <FormHelperText>
                      Brief description for your site.
                    </FormHelperText>
                  )}

                  <FormErrorMessage>
                    {errors.siteMetadata?.description?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="image">
                  <FormLabel>Image</FormLabel>

                  <Controller
                    control={control}
                    name="siteMetadata.image"
                    render={({field: {value}}) => (
                      <Stack
                        direction="row"
                        spacing="6"
                        align="center"
                        width="full">
                        <Avatar size="xl" name="Site Logo" src={value} />
                        <Box>
                          <HStack spacing="5">
                            <Button
                              leftIcon={<HiCloudUpload />}
                              onClick={handleSiteImageUpload}>
                              Change photo
                            </Button>
                            <Button
                              variant="ghost"
                              colorScheme="red"
                              onClick={handleSiteImageDelete}>
                              Delete
                            </Button>
                          </HStack>
                          <Text
                            fontSize="sm"
                            mt="3"
                            color={useColorModeValue(
                              'gray.500',
                              'whiteAlpha.600'
                            )}>
                            Upload a photo to represent this site.
                          </Text>
                        </Box>
                      </Stack>
                    )}
                  />
                </FormControl>
              </VStack>
            </FieldGroup>

            <FieldGroup title="Author">
              <VStack width="full" spacing="6">
                <FormControl isInvalid={!!errors?.siteMetadata?.author?.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Emma Doe"
                    {...register('siteMetadata.author.name', {
                      maxLength: {value: 100, message: 'Name is too long'}
                    })}
                  />
                  <FormErrorMessage>
                    {errors.siteMetadata?.author?.name?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </FieldGroup>
            <FieldGroup title="Organisation">
              <VStack width="full" spacing="6">
                <FormControl
                  isInvalid={!!errors?.siteMetadata?.organization?.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Snek"
                    {...register('siteMetadata.organization.name', {
                      maxLength: {value: 100, message: 'Name is too long'}
                    })}
                  />
                  <FormErrorMessage>
                    {errors.siteMetadata?.organization?.name?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors?.siteMetadata?.organization?.url}>
                  <FormLabel>Url</FormLabel>
                  <Input
                    placeholder="https://snek.at"
                    {...register('siteMetadata.organization.url', {
                      validate: {
                        checkUrl: value =>
                          value && !/^https?:\/\//.test(value)
                            ? 'Url must start with http:// or https://'
                            : undefined
                      }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.siteMetadata?.organization?.url?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="image">
                  <FormLabel>Image</FormLabel>

                  <Controller
                    control={control}
                    name="siteMetadata.organization.logo"
                    render={({field: {value}}) => (
                      <Stack
                        direction="row"
                        spacing="6"
                        align="center"
                        width="full">
                        <Avatar
                          size="xl"
                          name="Organisation Logo"
                          src={value}
                        />
                        <Box>
                          <HStack spacing="5">
                            <Button
                              leftIcon={<HiCloudUpload />}
                              onClick={handleOrganizationLogoUpload}>
                              Change photo
                            </Button>
                            <Button
                              variant="ghost"
                              colorScheme="red"
                              onClick={handleOrganizationLogoDelete}>
                              Delete
                            </Button>
                          </HStack>
                          <Text
                            fontSize="sm"
                            mt="3"
                            color={useColorModeValue(
                              'gray.500',
                              'whiteAlpha.600'
                            )}>
                            Upload a photo of your organisation.
                          </Text>
                        </Box>
                      </Stack>
                    )}
                  />
                </FormControl>
              </VStack>
            </FieldGroup>
            <FieldGroup title="Language">
              <VStack width="full" spacing="6">
                <LanguageSelect />
              </VStack>
            </FieldGroup>
          </Stack>
          <FieldGroup mt="8">
            <HStack width="full">
              <ButtonGroup isDisabled={disabled}>
                <Button
                  type="submit"
                  mr="4"
                  colorScheme="blue"
                  isLoading={isSubmitting}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={onReset}>
                  Cancel
                </Button>
              </ButtonGroup>
            </HStack>
          </FieldGroup>
        </form>
      </Box>
    </>
  )
}

export default SettingsTab
