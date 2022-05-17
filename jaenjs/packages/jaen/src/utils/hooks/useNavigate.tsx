import {navigate as gatsbyNavigate} from 'gatsby'
import {
  useInRouterContext,
  useNavigate as routerUseNavigate
} from 'react-router-dom'
import * as React from 'react'

export const useNavigate = () => {
  let pureNavigate: any = gatsbyNavigate

  let inRouter = false
  if (typeof window !== 'undefined') {
    inRouter = useInRouterContext()
  }

  if (inRouter) {
    pureNavigate = routerUseNavigate()
  }

  const navigate = React.useCallback((to: string) => {
    // if inRouter erase all before # (/test#/test3 => /test3)
    if (inRouter) {
      const hashIndex = to.indexOf('#')
      if (hashIndex > -1) {
        to = to.substring(hashIndex + 1)
      }
    }

    pureNavigate(to)
  }, [])

  return navigate
}
