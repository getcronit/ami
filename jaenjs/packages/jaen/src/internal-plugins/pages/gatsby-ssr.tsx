import {SiteProvider} from '@jaen-pages/internal/services/site'
import type {GatsbySSR} from 'gatsby'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <SiteProvider>{element}</SiteProvider>
}
