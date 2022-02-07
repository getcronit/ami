import {OSGBackend} from '@jaenjs/snek-finder/src/backends/OSGBackend'
import loadable from '@loadable/component'
import {graphql, useStaticQuery} from 'gatsby'

const SnekFinderProvider = loadable(() => import('@jaenjs/snek-finder'), {
  resolveComponent: components => components.SnekFinderProvider
})

export const Backend = new OSGBackend('snek-finder-osg-backend-root')

export const SnekFinder: React.FC = ({children}) => {
  const {jaenInternal} = useStaticQuery<{
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

  return (
    <SnekFinderProvider
      backend={Backend}
      initDataLink={jaenInternal.finderUrl || undefined}>
      {children}
    </SnekFinderProvider>
  )
}

export const withSnekFinder = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => props => {
  return (
    <SnekFinder>
      <Component {...props} />
    </SnekFinder>
  )
}
