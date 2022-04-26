import {css} from '@emotion/react'

export const AccordionStyle = css`
  .item {
    &:first {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      .button {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }
    &:last {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .button {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      .panel {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
`
