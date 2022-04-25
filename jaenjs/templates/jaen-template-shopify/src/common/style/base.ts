import {css} from '@emotion/react'
import {mq} from '../utils'

export const Shine = css`
  overflow: hidden;
  position: relative;

  :before {
    content: ' ';
    position: absolute;
    z-index: 1;
    width: 120%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: transform 0.8s ease;
    transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 135deg)
      translate3d(0, 100%, 0);
    box-sizing: border-box;
    ${mq[0]} {
      top: -17.5%;
      left: -27.5%;
    }
    ${mq[3]} {
      top: 0;
      left: -10%;
    }
  }
  :hover {
    filter: brightness(80%);
  }
  :hover::before {
    ${mq[0]} {
      transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 135deg)
        translate3d(0, -160%, 0);
    }
    ${mq[3]} {
      transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 135deg)
        translate3d(0, -130%, 0);
    }
  }
`
