import {css, CSSObject} from '@emotion/react'

const parallaxMake = (parallax__layers: number) => {
  let styles: CSSObject = {};
  for (let i = 0; i <= parallax__layers; i++) {
    let x = (parallax__layers - i) / 2;
    
    styles[".parallax__layer__" + i] = {
      transform: `translateZ(${-100 * x}px) scale(${x/2 + 3})`
    };
  }
  return styles;
};

export const Section = (strokeColor: string, backgroundColor: string, noScroll: boolean | undefined) => css`
  perspective: 100px;
  height: 800px;
  overflow-x: hidden;
  overflow-y: ${noScroll ? "scroll" : "hidden"};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .parallax__layer{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
    .background-logo{
      display: block;
      height: 100px;

      * {
        fill: transparent;
        stroke: ${strokeColor};
        stroke-width: 5px;
      }
      #a2 {
        display: none;
      }
      #font2 {
        display: none;
      }
      #squerl2 {
        fill: transparent;
        stroke: transparent;
      }
      #crosshair3 {
        fill: ${backgroundColor};
      }
    }
  }

  .parallax__cover{
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 2000px;
    z-index: 2;
  }

  ${parallaxMake(13)}
`