import React from 'react'
import {useRef, useEffect, useState} from 'react'

export const useScrollSync = (offset: number = 0, offsetTop?: number, noScroll?: boolean) => {
  const [scrollTop, setScrollTop] = useState(0)

  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScrollHandler = (e: Event) => {
      const target = e.target as Document

      setScrollTop(target.documentElement.scrollTop)

      ref.current!.scrollTop =
        target.documentElement.scrollTop / 2 -
        (offsetTop ? offsetTop : ref.current!.offsetTop) -
        (noScroll ? 999999999 : offset)
    }

    window.addEventListener('scroll', onScrollHandler)

    return () => window.removeEventListener('scroll', onScrollHandler)
  }, [scrollTop])

  return {
    scrollTop,
    ref
  }
}
