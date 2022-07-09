import type {GatsbySSR} from 'gatsby'
import {SiteProvider} from '../../../src/internal-plugins/pages/internal/services/site'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <SiteProvider>{element}</SiteProvider>
}
