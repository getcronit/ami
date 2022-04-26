import {css} from '@emotion/react'

export const Section = () => css`
  * {
    z-index: 1;
  }
`

export const CardStyle = () => css`
  .image-container {
    width: 100%;
    height: auto;
  }
  .image {
    object-fit: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`
