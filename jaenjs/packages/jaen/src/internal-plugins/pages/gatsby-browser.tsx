import {PersistorWrapper} from './internal/redux/index'
import {SiteProvider} from './internal/services/site'
import type {GatsbyBrowser} from 'gatsby'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element
}) => {
  return (
    <PersistorWrapper>
      <SiteProvider>{element}</SiteProvider>
    </PersistorWrapper>
  )
}
