import React from 'react'
import {
  Box,
} from '@chakra-ui/layout'
import {Logo} from '../../../common/assets/Logo'

import * as style from './style'

export interface FixedStrokeLogoProps {
  strokeColor: string
  backgroundColor: string
}

export const FixedStrokeLogo = ({strokeColor, backgroundColor}: FixedStrokeLogoProps) => {
  return (
    <Box position="fixed" top="0" display={{ base: 'none', '2xl': 'block' }} css={style.Logo(strokeColor, backgroundColor)}>
      <Logo className="background-logo" />
    </Box>
  )
}
