import {css} from '@emotion/react'

const borderColor = (color?: string) => (color ? color : '#ef3340')
const transformWidth = (width?: string) =>
  width ? 'scaleX(1.' + width.split('%')[0] + ')' : 'scaleX(1.3)'
const borderlinWidth = (width?: string) => (width ? width : '30%')

export const cardStyle = (
  borderline?: boolean,
  bwidth?: string,
  color?: string,
  left?: boolean
) => css`
  .pcard {
    display: block;
    position: relative;
    border-collapse: collapse;
    text-decoration: none;
    transition: all 150ms;
    z-index: 1;

    * {
      text-decoration: none;
    }

    .borderline {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      right: 0%;
      border-collapse: collapse;
      text-decoration: none;

      &:before {
        transition: all 150ms;
        position: absolute;
        content: '';
        width: 100%;
        height: 50%;
        left: 50%;
        margin-left: -50%;
        top: 25%;
        border-color: rgba(255, 255, 255, 0);
        border-style: solid;
        border-width: 0 2px;
        border-radius: 5px;
      }

      &:after {
        transition: all 150ms;
        position: absolute;
        content: '';
        width: 50%;
        height: 100%;
        left: 50%;
        margin-left: -25%;
        top: 0;
        border-color: rgba(255, 255, 255, 0);
        border-style: solid;
        border-width: 2px 0;
        border-radius: 5px;
      }
    }

    .bspacer {
      ${left ? 'left: 0' : 'right: 0'}
    }

    .imgline {
      opacity: 0;
      top: 0;
      ${left ? 'right: calc(100% * (1/1.3));' : 'left: calc(100% * (1/1.3));'}
      width: calc(${borderlinWidth(bwidth)} * (1/1.3));
    }

    .imgline {
      opacity: 0;
    }

    &:hover {
      transform: scale(1.03);
      z-index: 2;
    }

    &:hover .borderline {
      position: absolute;
      top: 0;
      animation: scale-up-hor-left 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)
        both;
      ${borderline ? '' : 'animation: none;'}
    }

    &:hover .borderline:after {
      width: 100%;
      margin-left: -50%;
      border-color: ${borderColor(color)};
    }

    &:hover .borderline:before {
      height: 100%;
      top: 0%;
    }
    &:hover .imgline {
      ${borderline ? '' : 'display: none;'}
      opacity: 1;
      animation: opacity-up-hor 400ms ease-in 0ms 1 normal none;
    }
    .radioimg {
      display: none;
    }
    .radioimg + .preview {
      top: 0;
      display: none;
    }
    .radioimg:checked + .preview {
      position: absolute;
      display: block;
    }
    .radioimg + .main {
      opacity: 0;
    }
    .radioimg:checked + .main {
      opacity: 1;
    }
  }

  @keyframes opacity-up-hor {
    0% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes scale-up-hor-left {
    0% {
      transform: scaleX(1.03);
      transform-origin: ${left ? '100%' : '0%'} 0%;
    }
    100% {
      transform: ${transformWidth(bwidth)};
      transform-origin: ${left ? '100%' : '0%'} 0%;
    }
  }
`
