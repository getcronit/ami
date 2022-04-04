import {Box, BoxProps, useDisclosure} from '@chakra-ui/react'
import {withSnekFinder} from '../../../../withSnekFinder'
import {useSnekFinder} from '@jaenjs/snek-finder'
import {getSrc} from 'gatsby-plugin-image'
import React from 'react'
import {ImageFieldData} from '.'
import UpdateModal from './components/UpdateModal'

export interface IInteractiveImageProps extends BoxProps {
  data: {
    gatsbyImage: ImageFieldData['gatsbyImage']
    internalImageUrl?: string | null
    alt?: string
    title?: string
  }
  image: JSX.Element
  handleUpdateValue: (data: {
    internalImageUrl?: string | null
    alt?: string
    title?: string
  }) => void
}

export const InteractiveImage: React.FC<IInteractiveImageProps> =
  withSnekFinder(({data, handleUpdateValue, image, ...rest}) => {
    const updateDisclosure = useDisclosure()

    const finder = useSnekFinder({
      mode: 'selector',
      onAction: action => {
        if (action.type === 'SELECTOR_SELECT') {
          handleUpdateValue({
            internalImageUrl: action.payload.item.src,
            title: action.payload.item.name,
            alt: action.payload.item.description
          })
        }
      }
    })

    const handleBoxClick = () => {
      if (updateable) {
        updateDisclosure.onOpen()
      } else {
        finder.toggleSelector()
      }
    }

    const gatsbyImageSrc = data.gatsbyImage && getSrc(data.gatsbyImage)
    let updateable = false

    // check if internalImageUrl is a string
    if (
      data.internalImageUrl !== null &&
      (!!data?.internalImageUrl || !!data.gatsbyImage)
    ) {
      updateable = true
    }

    return (
      <>
        {finder.finderElement}
        <UpdateModal
          {...updateDisclosure}
          data={{
            image: data.internalImageUrl || gatsbyImageSrc || '',
            description: data?.alt || '',
            title: data?.title || ''
          }}
          onUpdate={({image: internalImageUrl, description: alt, title}) => {
            handleUpdateValue({
              internalImageUrl,
              alt,
              title
            })
          }}
          onDelete={() => handleUpdateValue({internalImageUrl: null})}
        />

        <Box
          {...rest}
          onClick={handleBoxClick}
          cursor={updateable ? 'pointer' : 'default'}>
          {image}
        </Box>
      </>
    )
  })

export default InteractiveImage
