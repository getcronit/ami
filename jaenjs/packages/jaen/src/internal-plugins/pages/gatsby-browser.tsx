import type {GatsbyBrowser} from 'gatsby'
import {SiteProvider} from '../../../src/internal-plugins/pages/internal/services/site'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element
}) => {
  return <SiteProvider>{element}</SiteProvider>
}
