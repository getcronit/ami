import {NavigateOptions} from '@reach/router'
import {navigate as gatsbyNavigate} from 'gatsby'
import {store} from '../../redux'

export const navigate = async (
  to: string,
  options?: NavigateOptions<{}>
): Promise<void> => {
  // We can determine if a page has been moved by checking if the path is no longer in the dynamicPaths, if so
  // we search for the the new path in the dynamicPaths by pageId and redirect to it.

  const dynamicPaths = store.getState().internal.routing.dynamicPaths

  const pathWithoutTrailingSlash = to.replace(/\/$/, '')

  const pageId = dynamicPaths[pathWithoutTrailingSlash]

  if (pageId) {
    to = `/~#${pathWithoutTrailingSlash}`
  }

  gatsbyNavigate(to, options)
}
