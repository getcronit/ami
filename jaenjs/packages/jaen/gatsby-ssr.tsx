import {PersistorWrapper} from './src/redux'
import AdminToolbarContainer from './src/ui/AdminToolbar'
import {GatsbyBrowser} from 'gatsby'
import {SnekFinder} from './src/withSnekFinder'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}) => {
  return (
    <>
      <PersistorWrapper>
        <AdminToolbarContainer sticky />
      </PersistorWrapper>

      {element}
    </>
  )
}
