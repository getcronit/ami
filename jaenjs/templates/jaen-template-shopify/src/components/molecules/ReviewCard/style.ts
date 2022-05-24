import {css} from '@emotion/react'

export const Modal = css`
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

export const Borderline = css`
  .borderline {
    display: block;
    position: relative;
    border-collapse: collapse;
    text-decoration: none;
    transition: all 150ms;
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
    &:hover {
      &:after {
        width: 100%;
        margin-left: -50%;
      }
      &:before {
        height: 100%;
        top: 0%;
      }
    }
  }
`