import React from 'react'
import {useRef, useEffect, useState} from 'react'

export const useScrollSync = (offset?: number) => {
    const [scrollTop, setScrollTop] = useState(0)
  
    const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      const onScrollHandler = (e: Event) => {
        const target = e.target as Document
  
        setScrollTop(target.documentElement.scrollTop)
  
        ref.current!.scrollTop = target.documentElement.scrollTop / 2 - (offset ? offset : ref.current!.offsetTop)
      }
  
      window.addEventListener('scroll', onScrollHandler)
  
      return () => window.removeEventListener('scroll', onScrollHandler)
    }, [scrollTop])
  
    return {
      scrollTop,
      ref
    }
  }