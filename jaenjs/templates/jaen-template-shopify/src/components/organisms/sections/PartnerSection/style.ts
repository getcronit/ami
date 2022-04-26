import {css} from '@emotion/react'

export const ImageStyle = (width: number, height: number) => css`
  &:hover > .ref-container > .image-container {
    transform: scale(1.1);
  }

  .image-container {
    transition: scale 150ms;
    image-rendering: optimizeQuality;
    object-fit: contain;
    max-height: ${height}px;
    max-width: ${width}px;
  }
`
