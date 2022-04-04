import {Box, Image, Skeleton} from '@chakra-ui/react'
import loadable from '@loadable/component'
import {
  GatsbyImage,
  IGatsbyImageData,
  Layout,
  StaticImage
} from 'gatsby-plugin-image'
import * as React from 'react'
import {CSSProperties} from 'react'

const InteractiveImage = loadable(() => import('../InteractiveImage'))

export type {Layout}

export type StaticImageElementType = React.ReactElement<
  React.ComponentProps<typeof StaticImage>
>

export interface JaenImageData {
  title: string
  alt: string
  backgroundColor?: string
  objectFit?: CSSProperties['objectFit']
  objectPosition?: CSSProperties['objectPosition']
  layout: Layout
  width: number
  height: number
  gatsbyImage?: IGatsbyImageData
  internalImageUrl?: string | null // not set after build
}

export interface JaenImageProps {
  isEditing: boolean
  className?: string
  style?: CSSProperties
  imgClassName?: string
  imgStyle?: CSSProperties
  image: JaenImageData
  onLoad?: () => void
  onError?: () => void
  onStartLoad?: (props: {wasCached?: boolean}) => void
  /**
   * Renders the image based on the provided url instead of the imageId or
   * default static image.
   *
   * This does not support SSR.
   *
   * @example `https://via.placeholder.com/300x200`
   */
  defaultStaticImageElement: StaticImageElementType | null
  onUpdateValue: (value: Partial<JaenImageData>) => void
}

export const JaenImage = (props: JaenImageProps) => {
  const isSSR = React.useMemo(() => {
    const {
      image: {gatsbyImage, internalImageUrl},
      defaultStaticImageElement
    } = props

    const a = Boolean(internalImageUrl)
    const b = Boolean(gatsbyImage)
    const c = Boolean(defaultStaticImageElement)

    return (!a && b) || (!a && c)
  }, [props.image, props.defaultStaticImageElement])

  const wrapperElementProps = {className: props.className, style: props.style}

  // extract some props as imageProps
  const imgElementProps = {
    title: props.image.title,
    alt: props.image.alt,
    imgClassName: props.imgClassName,
    imgStyle: props.imgStyle,
    width: props.image.width,
    height: props.image.height,
    onLoad: props.onLoad,
    onError: props.onError,
    onStartLoad: props.onStartLoad
  }

  // If SSR is not enabled, the image will be loaded from the imageUrl
  let imageElement: React.ReactElement<
    | React.ComponentProps<typeof Image>
    | React.ComponentProps<typeof GatsbyImage>
    | React.ComponentProps<typeof StaticImage>
  > | null = null

  if (!isSSR) {
    const isLoaded = Boolean(props.image.internalImageUrl)

    const img = (
      <Image
        {...imgElementProps}
        src={props.image.internalImageUrl!}
        fallback={<></>}
      />
    )

    imageElement = isLoaded ? (
      img
    ) : (
      <Skeleton isLoaded={isLoaded}>{img}</Skeleton>
    )
  } else {
    const {
      image: {gatsbyImage, internalImageUrl},
      defaultStaticImageElement
    } = props

    if (gatsbyImage && internalImageUrl !== null) {
      imageElement = <GatsbyImage {...imgElementProps} image={gatsbyImage} />
    } else if (defaultStaticImageElement) {
      imageElement = defaultStaticImageElement
    } else {
      throw new Error(
        'image or defaultStaticImageElement is required when SSR is enabled. This is likely a bug in JaenImage'
      )
    }
  }

  if (props.isEditing) {
    return (
      <InteractiveImage
        handleUpdateValue={props.onUpdateValue}
        data={{
          gatsbyImage: props.image.gatsbyImage,
          internalImageUrl: props.image.internalImageUrl,
          alt: props.image.alt,
          title: props.image.title
        }}
        image={imageElement}
        position="relative"
        display="block"
        {...wrapperElementProps}
      />
    )
  }

  return (
    <Box position="relative" display="block" {...wrapperElementProps}>
      {imageElement}
    </Box>
  )
}
