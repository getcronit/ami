import React from 'react'
import {
  Box,
} from '@chakra-ui/layout'
import {Logo} from '../../../common/assets/Logo'

import * as style from './style'

export interface StickyStrokeLogoProps {
  strokeColor: string
  backgroundColor: string
}

export const StickyStrokeLogo = ({strokeColor, backgroundColor}: StickyStrokeLogoProps) => {
  return (
    <Box position="sticky" top="0" mb="-10" h="10" display={{ base: 'none', '2xl': 'block' }} css={style.Logo(strokeColor, backgroundColor)}>
      <Logo className="background-logo" />
    </Box>
  )
}
