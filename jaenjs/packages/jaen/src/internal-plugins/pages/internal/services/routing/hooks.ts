import {useAppSelector} from '@jaen-pages/internal/redux'
import {navigate} from 'gatsby'
import React from 'react'

export const useDynamicRedirect = () => {
  const windowPathname =
    typeof window !== 'undefined' ? window.location.pathname : ''

  const dynamicPaths = useAppSelector(
    state => state.internal.routing.dynamicPaths
  )

  React.useEffect(() => {
    const withoutTrailingSlash = windowPathname.replace(/\/$/, '')

    const pageId = dynamicPaths[withoutTrailingSlash]

    if (pageId) {
      const withDynamicPrefix = `/_#${withoutTrailingSlash}`

      navigate(withDynamicPrefix)
    }
  }, [windowPathname])
}
