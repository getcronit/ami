import React from 'react'
import {useRef, useEffect, useState} from 'react'
import {Box} from '@chakra-ui/react'

// import Logo from '../../../assets/Logo'
import * as style from './style'

export interface ParallaxBackgroundProps {
  strokeColor: string
  backgroundColor: string
  noScroll?: boolean
}

export const ParallaxBackground = ({strokeColor, backgroundColor, noScroll}: ParallaxBackgroundProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScrollHandler = (e: Event) => {
      const target = e.target as Document;

      setScrollTop(target.documentElement.scrollTop);

      parallaxRef.current!.scrollTop = target.documentElement.scrollTop /2 - 1000
    }

    window.addEventListener("scroll", onScrollHandler);

    return () => window.removeEventListener("scroll", onScrollHandler);
  }, [scrollTop]);

  return (
    <Box className="parallax" css={style.Section(strokeColor, backgroundColor, noScroll)} ref={parallaxRef} backgroundColor={backgroundColor} >
      <div className="parallax__cover"></div>
    </Box>
  )
}
