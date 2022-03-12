import {SnekFinder} from '../withSnekFinder'
import {GatsbyBrowser} from 'gatsby'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  {element},
  ...rest
) => {
  const elem = <SnekFinder>{element}</SnekFinder>

  return elem
}
