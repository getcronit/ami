import {css} from '@emotion/react'

export const ScrollBar = css`
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 30px;
    background: #cbd5e0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #1f1f1d;
    border-radius: 30px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #424240;
  }
`
