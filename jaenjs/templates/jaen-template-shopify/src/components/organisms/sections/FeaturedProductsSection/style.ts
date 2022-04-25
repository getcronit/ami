import {css} from '@emotion/react'

export const Section = css`
  .background-logo {
    position: absolute;
    top: 1.5vw;
    left: 2.5vw;
    height: 5vw;
    * {
      fill: transparent;
      stroke: #dbd8d2;
      stroke-width: 5px;
    }
  }
  svg {
    #font2 {
      display: none;
    }
    #squerl2 {
      fill: white;
    }
    &:hover #crosshair3 {
      animation-name: spin;
      transform-origin: 272px 272px;
      animation-duration: 500ms;
      animation-iteration-count: once;
      animation-timing-function: linear;
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
