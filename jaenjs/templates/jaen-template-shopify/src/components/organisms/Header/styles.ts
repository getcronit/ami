import {css} from '@emotion/react'

export const Logo = css`
  svg {
    margin: -16px;
    #squerl2 {
      transition: 300ms;
      filter: drop-shadow(0 0px 0px #2151a1) drop-shadow(0 0px 0px #2151a1);
    }
    #font2 {
      transform: translateX(16px);
    }
    &:hover #crosshair3 {
      animation-name: spin;
      transform-origin: 272px 272px;
      animation-duration: 500ms;
      animation-iteration-count: once;
      animation-timing-function: linear;
    }
    &:hover #squerl2 {
      filter: drop-shadow(0 4px 10px #2151a1) drop-shadow(0 4px 20px #2151a1);
    }
    &:hover #font2 {
      filter: drop-shadow(0 4px 10px #2151a1) drop-shadow(0 4px 20px #2151a1);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(270deg);
    }
  }
`
