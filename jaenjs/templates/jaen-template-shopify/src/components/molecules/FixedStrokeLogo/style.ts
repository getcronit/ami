import {css} from '@emotion/react'

export const Logo = (strokeColor: string, backgroundColor: string) => css`
  .background-logo {
    position: absolute;
    top: calc(var(--chakra-space-20) - ((4em + 2.5vw)/2 - var(--chakra-fontSizes-5xl) /2 ));
    left: calc((4em + 2.5vw)/2);
    height: calc(4em + 2.5vw);
    * {
      fill: transparent;
      stroke: ${strokeColor};
      stroke-width: 5px;
    }
  }
  svg {
    #font2 {
      display: none;
    }
    #squerl2 {
      fill: ${backgroundColor};
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
