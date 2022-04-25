import {SiteProvider} from './internal/services/site'
import type {GatsbyBrowser} from 'gatsby'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element
}) => {
  return <SiteProvider>{element}</SiteProvider>
}
