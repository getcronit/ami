import {css, CSSObject} from '@emotion/react'

const parallaxMake = (parallax__layers: number) => {
  let styles: CSSObject = {};
  for (let i = 0; i <= parallax__layers; i++) {
    let x = (parallax__layers - i) / 2;
    
    styles[".parallax__layer__" + i] = {
      transform: `translateZ(${-100 * x}px) scale(${x + 1})`
    };
  }
  return styles;
};

export const Section = (noScroll?: boolean) => css`
  perspective: 100px;
  height: 800px;
  overflow-x: hidden;
  overflow-y: ${noScroll ? "scroll" : "hidden"};
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  margin-left: -1500px;

  .parallax__layer{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
    img{
      display: block;
      position: absolute;
      bottom: 0;
    }
  }

  .parallax__cover{
    background: #210002;
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 2000px;
    z-index: 2;
  }

  ${parallaxMake(8)}
`
