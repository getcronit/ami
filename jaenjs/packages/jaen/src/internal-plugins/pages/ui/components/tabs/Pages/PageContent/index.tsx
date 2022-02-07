import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Img,
  Input,
  Skeleton,
  Spacer,
  Stack,
  Text,
  Textarea,
  useToast
} from '@chakra-ui/react'
import {useSnekFinder} from '@jaenjs/snek-finder'
import * as React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {IFormProps, IJaenTemplate} from '../../../../../types'

import {HiCloudUpload} from '@react-icons/all-files/hi/HiCloudUpload'

export type ContentValues = {
  title: string
  slug: string
  image?: string
  description?: string
  excludedFromIndex?: boolean
}

export interface PageContentProps extends IFormProps<ContentValues> {
  template: IJaenTemplate | null
}

/**
 * Component for displaying a page content.
 *
 * It includes Accordion that can be used to expand/collapse the page content.
 */
export const PageContent = (props: PageContentProps) => {
  const toast = useToast()

  const [defaultValues, setDefaultValues] = React.useState<ContentValues>(
    props.values
  )

  React.useEffect(() => {
    setDefaultValues(props.values)
  }, [props.values])

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    control,
    formState: {errors, isSubmitting, isDirty, isValid}
  } = useForm<ContentValues>({
    defaultValues
  })

  const finder = useSnekFinder({
    mode: 'selector',
    onAction: action => {
      if (action.type === 'SELECTOR_SELECT') {
        const image = action.payload.item.src

        setValue('image', image, {
          shouldDirty: true
        })
      }
    }
  })

  const onSubmit = (values: ContentValues) => {
    const vs = {
      ...defaultValues,
      ...values
    }

    props.onSubmit(vs)

    setDefaultValues(vs)
    reset(vs)

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

  const handleImageUpload = () => {
    finder.toggleSelector()
  }

  const handleImageRemove = () => {
    setValue('image', '', {
      shouldDirty: true
    })
  }

  return (
    <>
      {finder.finderElement}
      <Flex flexDirection={'column'}>
        <Heading as={'h3'} size={'lg'} mb="4">
          Content{' '}
          {props.template && <Badge>{props.template.displayName}</Badge>}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box h="70vh" overflowY="scroll">
            <Accordion defaultIndex={0}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      General
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <FormControl isInvalid={!!errors.title}>
                      <FormLabel>Title</FormLabel>
                      <Input
                        // id="title"
                        placeholder="Title"
                        {...register('title', {
                          required: 'This is required',
                          minLength: {
                            value: 4,
                            message: 'Minimum length should be 4'
                          }
                        })}
                      />
                      <FormErrorMessage>
                        {errors.title?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mt={4} isInvalid={!!errors.slug}>
                      <FormLabel>Slug</FormLabel>
                      <Input
                        // id="slug"
                        placeholder="the-slug"
                        disabled={!props.template}
                        {...register('slug', {
                          required: 'This is required',
                          minLength: {
                            value: 4,
                            message: 'Minimum length should be 4'
                          },
                          pattern: {
                            value: /^[a-z0-9-]+$/,
                            message:
                              'Only lowercase letters, numbers and hyphens are allowed'
                          },
                          validate: (value: string) => {
                            const {externalValidation} = props

                            if (externalValidation) {
                              const validation = externalValidation(
                                'slug',
                                value
                              )

                              if (validation) {
                                return validation
                              }
                            }
                          }
                        })}
                      />
                      {!errors.slug && (
                        <FormHelperText>
                          Make sure the slug is unique between siblings.
                        </FormHelperText>
                      )}
                      <FormErrorMessage>
                        {errors.slug?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        // id="description"
                        placeholder="This is a sample description used for this page."
                        {...register('description', {})}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Image</FormLabel>

                      <Controller
                        control={control}
                        name="image"
                        render={({field: {value}}) => (
                          <Stack
                            direction="row"
                            spacing="6"
                            align="center"
                            width="full">
                            <Avatar size="xl" name="Page" src={value} />
                            <Box>
                              <HStack spacing="5">
                                <Button
                                  leftIcon={<HiCloudUpload />}
                                  onClick={handleImageUpload}>
                                  Change photo
                                </Button>
                                <Button
                                  variant="ghost"
                                  colorScheme="red"
                                  onClick={handleImageRemove}>
                                  Delete
                                </Button>
                              </HStack>
                              <Text fontSize="sm" mt="3" color="gray.500">
                                Upload a photo to represent this page.
                              </Text>
                            </Box>
                          </Stack>
                        )}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Settings</FormLabel>
                      <Checkbox {...register('excludedFromIndex')}>
                        Exclude form index
                      </Checkbox>
                    </FormControl>
                  </Box>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Fields
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Skeleton h="200"></Skeleton>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <Spacer flex="1" />
          <ButtonGroup isDisabled={!isDirty} mt="4">
            <Button
              colorScheme="blue"
              mr={4}
              isLoading={isSubmitting}
              type="submit">
              Save
            </Button>
            <Button onClick={onReset}>Cancel</Button>
          </ButtonGroup>
        </form>
      </Flex>
    </>
  )
}
