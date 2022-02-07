import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react'
import * as React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {IFormProps, IJaenTemplate} from '../../../../../types'

type TemplateSelectorProps = {
  selectedTemplate: string
  templates: Omit<IJaenTemplate, 'children'>[]
  onSelect: (templateName: string) => void
}

const TemplateSelector = ({
  selectedTemplate,
  templates,
  onSelect
}: TemplateSelectorProps) => {
  // const [selectedTemplate, setSelectedTemplate] = React.useState<string>(
  //   props.selectedTemplate
  // )

  const handleSelect = (templateName: string) => {
    let newSelectedTemplate = templateName

    // Clear selection if the same template is selected
    if (newSelectedTemplate === selectedTemplate) {
      newSelectedTemplate = ''
    }

    // setSelectedTemplate(newSelectedTemplate)
    onSelect(newSelectedTemplate)
  }

  return (
    <>
      {templates.map(({name, displayName}, key) => (
        <Button
          key={key}
          variant="outline"
          colorScheme={
            selectedTemplate && selectedTemplate === name ? 'blue' : 'gray'
          }
          mr={2}
          onClick={() => handleSelect(name)}>
          {displayName}
        </Button>
      ))}
    </>
  )
}

export type CreateValues = {
  slug: string
  title: string
  template: Omit<IJaenTemplate, 'children'>
}

export interface PageCreatorProps extends IFormProps<CreateValues> {
  templates: TemplateSelectorProps['templates']
  finalFocusRef: React.RefObject<any>
  isOpen: boolean
  onClose: () => void
}

/**
 * Modal to create a new page.
 * Renders a list of templates to choose from.
 */
export const PageCreator = ({
  templates,
  finalFocusRef,
  isOpen,
  onClose,
  ...form
}: PageCreatorProps) => {
  const initialFocusRef = React.useRef<any>()

  const toast = useToast()

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: {errors, isSubmitting, isDirty, isValid}
  } = useForm<CreateValues>({
    defaultValues: form.values
  })

  const onSubmit = (values: CreateValues) => {
    // update template displayName
    values.template = templates.find(
      e => e.name === values.template.name
    ) as IJaenTemplate

    form.onSubmit(values)

    reset()

    toast({
      title: 'Page created',
      description: `Page "${values.title}" created`,
      status: 'success'
    })
  }

  const onCancel = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create a page</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                {...register('title', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4'
                  }
                })}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.slug}>
              <FormLabel>Slug</FormLabel>
              <Input
                // id="slug"
                placeholder="the-slug"
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
                    const {externalValidation} = form

                    if (externalValidation) {
                      const validation = externalValidation('slug', value)

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
              <FormErrorMessage>{errors.slug?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.template?.name}>
              <FormLabel>Template</FormLabel>
              <Controller
                control={control}
                name="template.name"
                rules={{required: 'Please select a template'}}
                render={({field: {value, onChange}}) => (
                  <TemplateSelector
                    selectedTemplate={value}
                    templates={templates}
                    onSelect={templateName => {
                      onChange(templateName)
                    }}
                  />
                )}
              />
              {!errors.template?.name && (
                <FormHelperText>
                  Select the template to use for this page.
                </FormHelperText>
              )}
              <FormErrorMessage>
                {errors.template?.name?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={isSubmitting}
              disabled={!isDirty}
              type="submit">
              Create
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
