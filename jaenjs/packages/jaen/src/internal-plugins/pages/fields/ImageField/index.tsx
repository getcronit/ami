import {
  Box,
  BoxProps,
  Button,
  Center,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import {useSnekFinder} from '@jaenjs/snek-finder'
import {GatsbyImage, getSrc, IGatsbyImageData} from 'gatsby-plugin-image'
import React, {CSSProperties, ReactEventHandler} from 'react'
import {HiCloudUpload} from 'react-icons/hi'
import {withSnekFinder} from '../../../../withSnekFinder'
import {connectField} from '../../index'
import UpdateModal from './components/UpdateModal'
import {useJaenPageImage} from './useJaenPageImage'

export interface ImageFieldProps {
  alt?: string
  className?: string
  style?: CSSProperties
  imgClassName?: string
  imgStyle?: CSSProperties
  backgroundColor?: string
  objectFit?: CSSProperties['objectFit']
  objectPosition?: CSSProperties['objectPosition']
  onLoad?: (props: {wasCached: boolean}) => void
  onError?: ReactEventHandler<HTMLImageElement>
  onStartLoad?: (props: {wasCached: boolean}) => void
}

export interface JaenImageFieldData {
  title?: string
  alt?: string
  imageId?: string
  internalImageUrl?: string | null
}

const ImageField = connectField<
  JaenImageFieldData,
  string | undefined,
  ImageFieldProps
>(
  ({jaenField, children, ...props}) => {
    const gatsbyImage = useJaenPageImage({
      id: jaenField?.staticValue?.imageId as string,
      byFieldName: jaenField.name
    })

    const value = {
      ...jaenField.staticValue,
      ...jaenField.value,
      internalImageUrl: jaenField.value?.internalImageUrl
    }

    console.log(jaenField.staticValue?.internalImageUrl)

    const imageFieldProps = {
      alt: value.alt || 'Image',
      title: value.title || 'Image',
      style: {
        width: '100%',
        height: '100%',
        ...jaenField.style
      },
      ...props
    }

    return (
      <JaenImage
        isEditing={jaenField.isEditing}
        imageFieldProps={imageFieldProps}
        internalImageUrl={value.internalImageUrl}
        defaultImageUrl={jaenField.defaultValue}
        imageData={gatsbyImage}
        handleUpdateImage={jaenField.onUpdateValue}
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
          internalImageUrl: null
        })
      }

      const gatsbyImage = useJaenPageImage({
        id: field?.value?.imageId as string,
        byFieldName: field.name
      })

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
                  gatsbyImage?.placeholder?.fallback ||
                  field.defaultValue
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

interface JJaenImageProps {
  isEditing: boolean
  imageFieldProps: ImageFieldProps & {
    alt: string
    title: string
    style: CSSProperties
  }
  imageData: IGatsbyImageData | undefined
  internalImageUrl: string | null | undefined
  defaultImageUrl: string | undefined
  handleUpdateImage: (imageData: {
    internalImageUrl: JJaenImageProps['internalImageUrl']
    alt?: string
    title?: string
  }) => void
}

const InteractiveWrapper: React.FC<{
  style: CSSProperties
  updateable: boolean
  imageData?: Partial<{
    alt: string
    title: string
    url: string
  }>
  handleUpdateImage: JJaenImageProps['handleUpdateImage']
}> = withSnekFinder(props => {
  const updateDisclosure = useDisclosure()
  const finder = useSnekFinder({
    mode: 'selector',
    onSelect: ({src, name, description}) => {
      props.handleUpdateImage({
        internalImageUrl: src,
        title: name,
        alt: description
      })
    }
  })

  const boxProps: BoxProps = {
    style: props.style,
    cursor: 'pointer',
    boxShadow: '0 0 0 2.5px #4fd1c5 !important',
    onClick: () => {
      if (props.updateable) {
        updateDisclosure.onOpen()
      } else {
        finder.toggleSelector()
      }
    }
  }

  return (
    <Box {...boxProps}>
      {finder.finderElement}
      <UpdateModal
        {...updateDisclosure}
        data={{
          image: props.imageData?.url,
          description: props.imageData?.alt,
          title: props.imageData?.title
        }}
        onUpdate={({image: internalImageUrl, description: alt, title}) => {
          props.handleUpdateImage({
            internalImageUrl,
            alt,
            title
          })
        }}
        onDelete={() => props.handleUpdateImage({internalImageUrl: null})}
      />
      {props.children}
    </Box>
  )
})

const JaenImage = (props: JJaenImageProps) => {
  const {
    isEditing,
    imageFieldProps,
    imageData,
    internalImageUrl,
    defaultImageUrl
  } = props

  let imageElement

  if (internalImageUrl) {
    imageElement = (
      <GatsbyImage
        {...imageFieldProps}
        // @ts-ignore
        image={{
          images: {
            sources: [],
            fallback: {
              src: internalImageUrl!
            }
          }
        }}
      />
    )
  } else {
    if (imageData && internalImageUrl !== null) {
      imageElement = <GatsbyImage {...imageFieldProps} image={imageData} />
    }

    if (!imageElement) {
      if (defaultImageUrl) {
        imageElement = (
          <GatsbyImage
            {...imageFieldProps}
            // @ts-ignore
            image={{
              images: {
                sources: [],
                fallback: {
                  src: defaultImageUrl
                }
              }
            }}
          />
        )
      } else {
        imageElement = (
          <Center
            style={imageFieldProps.style}
            backgroundImage="linear-gradient(to left, #c8d9ff 50%, transparent 50%)"
            backgroundSize="4px 100%">
            <Text color="gray.600" fontSize="sm">
              No image
            </Text>
          </Center>
        )
      }
    }
  }

  if (isEditing) {
    return (
      <InteractiveWrapper
        updateable={
          internalImageUrl !== null && (!!internalImageUrl || !!imageData)
        }
        imageData={{
          alt: imageFieldProps.alt,
          title: imageFieldProps.title,
          url: internalImageUrl || (imageData ? getSrc(imageData!) : '')
        }}
        style={imageFieldProps.style}
        handleUpdateImage={props.handleUpdateImage}>
        {imageElement}
      </InteractiveWrapper>
    )
  }

  return <Box style={imageFieldProps.style}>{imageElement}</Box>
}

export default ImageField
