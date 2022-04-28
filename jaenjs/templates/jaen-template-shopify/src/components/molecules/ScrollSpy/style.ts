import {css} from '@emotion/react'

export const Spy = css`
  cursor: pointer;
  user-select: none;

  &:hover {
    display: block;
    .spyblock-0 {
      display: none;
    }
  }

  .scrollto {
    display: none;
  }

  &:hover .scrollto {
    display: block;
  }

  .active-scroll-spy {
    color: #eb1933;
  }

  .spyblock {
    border-top-right-radius: 5px;
    
    &:hover * {
      color: #eb1933;
    }

    #crosshair4 {
      
    }

    &:hover #crosshair4 {
      opacity: 1;
      fill: #eb1933;

      animation-name: spin;
      transform-origin: center;
      animation-duration: 500ms;
      animation-iteration-count: once;
      animation-timing-function: linear;
    }
  }

  &:hover .spyblock {
    border-top-right-radius: unset;
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
