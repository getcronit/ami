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
const InteractiveImage = loadable(() => import('./InteractiveImage'))

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
    width = 300,
    height = 300,
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

    const image = (
      <JaenImage
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
      />
    )

    if (jaenField.isEditing) {
      return (
        <InteractiveImage
          handleUpdateValue={handleUpdateValue}
          data={{
            gatsbyImage,
            internalImageUrl: value.internalImageUrl,
            alt: value.alt,
            title: value.title
          }}>
          {image}
        </InteractiveImage>
      )
    }

    return image
  },
  {
    fieldType: 'IMA:ImageField'
  }
)

export default ImageField
