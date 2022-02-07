import {PersistorWrapper} from '@jaen-pages/internal/redux/index'
import {SiteProvider} from '@jaen-pages/internal/services/site'
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
