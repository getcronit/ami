import {css} from '@emotion/react'

const willItFlip = (flipMe: boolean) => (flipMe ? 'scaleX(-1)' : 'none')

export const flipImage = (flipMe: boolean) => css`
  .image {
    transform: ${willItFlip(flipMe)};
    object-fit: cover;
    pointer-events: none;
  }
`
