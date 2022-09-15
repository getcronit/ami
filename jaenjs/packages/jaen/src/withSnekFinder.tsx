import {OSGBackend} from '@jaenjs/snek-finder/src/backends/OSGBackend'
import {graphql, useStaticQuery} from 'gatsby'
import React from 'react'

const SnekFinderProvider = React.lazy(() =>
  import('@jaenjs/snek-finder').then(module => ({
    default: module.SnekFinderProvider
  }))
)

export const Backend = new OSGBackend('snek-finder-osg-backend-root')

export const SnekFinder: React.FC<React.PropsWithChildren> = ({children}) => {
  const isSSR = typeof window === 'undefined'

  let finderUrl

  try {
    const data = useStaticQuery<{
      jaenInternal: {
        finderUrl: string | null
      }
    }>(graphql`
      query JaenInternal {
        jaenInternal {
          finderUrl
        }
      }
    `)

    finderUrl = data.jaenInternal.finderUrl
  } catch {
    finderUrl = null
  }

  return (
    <React.Suspense fallback={null}>
      {!isSSR && (
        <SnekFinderProvider
          backend={Backend}
          initDataLink={finderUrl || undefined}>
          {children}
        </SnekFinderProvider>
      )}
    </React.Suspense>
  )
}

export const withSnekFinder = <P extends object>(
  Component: React.ComponentType<React.PropsWithChildren<P>>
): React.FC<React.PropsWithChildren<P>> => props => {
  return (
    <SnekFinder>
      <Component {...props} />
    </SnekFinder>
  )
}
