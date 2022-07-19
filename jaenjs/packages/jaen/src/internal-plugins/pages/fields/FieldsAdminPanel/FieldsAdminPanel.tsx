import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import {Control, Controller, useForm} from 'react-hook-form'
import {FieldOptions, JaenFieldProps} from '../../connectors'
import {Field} from '../../index'
import {useAppDispatch} from '../../internal/redux'
import {internalActions} from '../../internal/redux/slices'
import {useField} from '../../internal/services/field'
import {usePageFieldsRegister} from '../../internal/services/page/hooks'
import {JaenSectionProvider} from '../../internal/services/section'

const FormField = ({
  name,
  type,
  index,
  control,
  props
}: {
  name: string
  type: string
  index: number
  control: Control
  props: JaenFieldProps<any>
}) => {
  const field = useField(name, type)

  let getAdminWidget: FieldOptions<any, typeof props>['getAdminWidget']

  switch (type) {
    case 'IMA:TextField':
      //return <TextFieldPanel key={v.id} field={v} />
      getAdminWidget = Field.Text.options.getAdminWidget

      break

    case 'IMA:ImageField':
      getAdminWidget = Field.Image.options.getAdminWidget

      break

    case 'IMA:ChoiceField':
      getAdminWidget = Field.Choice.options.getAdminWidget as any

      break
  }

  const formLabel = props.displayName || name

  return (
    <FormControl>
      <FormLabel>
        <Text fontSize="lg">{formLabel}</Text>
      </FormLabel>

      <Controller
        control={control}
        name={`${index}`}
        render={({field: {value, onChange}}) => {
          const onChangeValue = (value: any) => {
            console.log('onChangeValue', value)
            onChange(value)
          }

          if (getAdminWidget) {
            return getAdminWidget({
              field: {
                defaultValue:
                  field.value || field.staticValue || props.defaultValue,
                value: value,
                onChange: onChangeValue
              },
              ...props
            })
          }

          return <>None</>
        }}
      />
    </FormControl>
  )
}

const SectionFormField = ({
  section,
  control
}: {
  section: Section
  control: Control
}) => {
  return (
    <Box m={1} p={2} borderLeft={'4px'} borderColor="teal">
      <Heading>{section.path.at(-1)?.fieldName}</Heading>
      <Stack divider={<Divider />} spacing={8}>
        {section.items.map((sectionItem, index) => {
          return (
            <JaenSectionProvider
              key={index}
              path={section.path}
              id={sectionItem.id}>
              <Stack
                m={1}
                p={2}
                divider={<Divider variant="dashed" />}
                spacing={6}>
                {sectionItem.fields.map((field, index) => {
                  if (field.__type === 'field') {
                    return (
                      <FormField
                        name={field.name}
                        type={field.type}
                        control={control}
                        index={field.order}
                        props={field.props}
                      />
                    )
                  }

                  if (field.__type === 'section') {
                    return (
                      <SectionFormField section={field} control={control} />
                    )
                  }

                  return null
                })}
              </Stack>
            </JaenSectionProvider>
          )
        })}
      </Stack>
    </Box>
  )
}

const FieldsAdminPanel = (props: {jaenPageId: string}) => {
  const Panel = () => {
    const dispatch = useAppDispatch()

    const toast = useToast()
    const registerdFields = usePageFieldsRegister(props.jaenPageId)

    type FormValues = {
      [key: string]: any
    }

    const {
      register,
      reset,
      handleSubmit,
      setValue,
      control,
      getValues,
      formState: {errors, isSubmitting, isDirty, isValid}
    } = useForm<FormValues>({})

    const onSubmit = (values: FormValues) => {
      for (let i = 0; i < registerdFields.length; i++) {
        const {fieldName, fieldType, section} = registerdFields[i]
        const value = values[i]

        if (value) {
          dispatch(
            internalActions.field_write({
              pageId: props.jaenPageId,
              section,
              fieldType,
              fieldName,
              value
            })
          )
        }
      }

      reset(values)

      toast({
        title: 'Success',
        description: 'Fields saved',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    }

    return (
      <Box p={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack divider={<Divider />} overflowY={'auto'} h={'70vh'}>
            {transformed.map((field, index) => {
              if (field.__type === 'field') {
                return (
                  <FormField
                    key={index}
                    name={field.name}
                    type={field.type}
                    control={control}
                    index={field.order}
                    props={field.props}
                  />
                )
              }

              if (field.__type === 'section') {
                return <SectionFormField section={field} control={control} />
              }

              return null
            })}
          </Stack>
          <ButtonGroup isDisabled={!isDirty} mt="8">
            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
              Save
            </Button>
            <Button onClick={() => reset()}>Cancel</Button>
          </ButtonGroup>
        </form>
      </Box>
    )
  }

  return (
    <Box p={1}>
      <Text fontSize="lg">Currently not implemented</Text>
    </Box>
  )
}

export default FieldsAdminPanel
