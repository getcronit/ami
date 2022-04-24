import React from 'react'
import {Image} from '@chakra-ui/image'
import {injectable} from 'react-magnetic-di'
import {Box} from '@chakra-ui/react'

export const GCImage = injectable(
  (props: {gimg: JSX.Element}) => props.gimg,
  (props: {gimg: JSX.Element}) => (
    <Box className={props.gimg.props.className} style={props.gimg.props.style}>
      <Image
        className={props.gimg.props.imgClassName}
        style={props.gimg.props.imgStyle}
        alt={props.gimg.props.alt}
        src={props.gimg.props.src}
      />
    </Box>
  )
)
