import {css} from '@emotion/react'

const isVisible = (visible: boolean) => (visible ? 'block' : 'none')

export const Section = () => css`
  * {
    z-index: 1;
  }
`

export const ReviewStyle = (visible1: boolean, visible2: boolean) => css`
  &:hover > .button1 {
    display: ${isVisible(visible1)};
  }
  &:hover > .button2 {
    display: ${isVisible(visible2)};
  }
`
