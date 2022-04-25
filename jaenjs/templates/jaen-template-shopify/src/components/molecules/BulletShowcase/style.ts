import {css} from '@emotion/react'

export const BulletStyle = css`
  .bullet {
    cursor: pointer;
    svg {
      margin-left: 20px;
      margin-right: 20px;
      fill: #1f1f1d;
    }
    p {
      color: black;
    }
    :hover {
      svg {
        fill: #2151a1;
      }
      p {
        color: #2151a1;
      }
      transform: scale(1.1);
    }
  }
`
