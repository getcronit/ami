import {IGatsbyImageData} from 'gatsby-plugin-image'
import {connectField} from '../../index'
import {
  JaenImage,
  JaenImageData,
  JaenImageProps,
  StaticImageElementType
} from './JaenImage'
import {useJaenPageImage} from './useJaenPageImage'
import loadable from '@loadable/component'
import {
  Stack,
  Avatar,
  Box,
  HStack,
  Button,
  Text,
  Image,
  Center
} from '@chakra-ui/react'
import {HiCloudUpload} from 'react-icons/hi'
import {useSnekFinder} from '@jaenjs/snek-finder'

export interface ImageFieldData extends JaenImageData {
  imageId?: string
}

export type ImageFieldProps = Partial<
  Pick<ImageFieldData, 'width' | 'height' | 'layout'>
> &
  Pick<
    JaenImageProps,
    'imgClassName' | 'imgStyle' | 'onError' | 'onLoad' | 'onStartLoad'
  >

const ImageField = connectField<
  ImageFieldData,
  StaticImageElementType | null,
  ImageFieldProps
>(
  ({
    jaenField,
    imgStyle,
    imgClassName,
    width,
    height,
    layout = 'constrained'
  }) => {
    const value = {
      ...jaenField.staticValue,
      ...jaenField.value,
      internalImageUrl: jaenField?.value?.internalImageUrl
    }

    let gatsbyImage: IGatsbyImageData | undefined

    if (jaenField.staticValue) {
      // If staticValue is defined, the imageId must also be defined,
      // otherwise throw an error.

      const {imageId} = jaenField.staticValue

      if (!imageId) {
        throw new Error(
          'staticValue is defined, but staticValue.imageId is not. This is not allowed.'
        )
      }

      gatsbyImage = useJaenPageImage({id: imageId})
    }

    const handleUpdateValue = (data: Partial<ImageFieldData>) => {
      jaenField.onUpdateValue({
        layout, // ?
        width, // ?
        height, // ?
        title: data.title || 'Jaen Image', // ?
        alt: data.alt || 'Jaen Image', // ?
        ...value,
        ...data
      })
    }

    return (
      <JaenImage
        isEditing={jaenField.isEditing}
        image={{
          title: value.title || 'A Jaen Image',
          alt: value.alt || 'A Jaen Image',
          internalImageUrl: value.internalImageUrl,
          layout: value.layout || layout,
          width,
          height,
          gatsbyImage
        }}
        className={jaenField.className}
        style={jaenField.style}
        imgClassName={imgClassName}
        imgStyle={imgStyle}
        defaultStaticImageElement={jaenField.defaultValue}
        onUpdateValue={handleUpdateValue}
      />
    )
  },
  {
    fieldType: 'IMA:ImageField',
    getAdminWidget: ({field}) => {
      const finder = useSnekFinder({
        mode: 'selector',
        onSelect: ({src}) => {
          field.onChange({
            ...field.value,
            internalImageUrl: src
          })
        }
      })

      const handleImageRemove = () => {
        field.onChange({
          ...field.value,
          internalImageUrl: undefined
        })
      }

      return (
        <>
          {finder.finderElement}
          <Stack direction="row" spacing="6" align="center" width="full">
            {JSON.stringify(field.defaultValue)}

            <Box boxSize={36} borderRadius="lg" bg="gray.50">
              <Image
                borderRadius="lg"
                boxSize={'100%'}
                src={
                  field.value?.internalImageUrl ||
                  field.value?.gatsbyImage?.placeholder?.fallback ||
                  field.defaultValue?.internalImageUrl ||
                  field.defaultValue?.gatsbyImage?.placeholder?.fallback
                }
                fallback={
                  <Center boxSize={'100%'}>
                    <Text color="gray.600" fontSize="sm">
                      No image
                    </Text>
                  </Center>
                }
              />
            </Box>

            <Box>
              <HStack spacing="5">
                <Button
                  leftIcon={<HiCloudUpload />}
                  onClick={finder.toggleSelector}>
                  Change photo
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="red"
                  onClick={handleImageRemove}>
                  Delete
                </Button>
              </HStack>
            </Box>
          </Stack>
        </>
      )
    }
  }
)

export default ImageField
