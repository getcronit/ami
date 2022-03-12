import {SiteProvider} from './internal/services/site'
import type {GatsbySSR} from 'gatsby'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <SiteProvider>{element}</SiteProvider>
}
