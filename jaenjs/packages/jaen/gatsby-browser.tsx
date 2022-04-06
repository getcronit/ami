import {PersistorWrapper} from './src/redux'
import AdminToolbarContainer from './src/ui/AdminToolbar'
import {GatsbyBrowser} from 'gatsby'
import {SnekFinder} from './src/withSnekFinder'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}) => {
  const pathname = window.location.pathname

  if (pathname.startsWith('/jaen/admin')) {
    return (
      <PersistorWrapper>
        <SnekFinder>{element}</SnekFinder>
      </PersistorWrapper>
    )
  }

  return (
    <>
      <PersistorWrapper>
        <AdminToolbarContainer sticky />
      </PersistorWrapper>

      {element}
    </>
  )
}
