import {useAppSelector, withRedux} from '@jaen/redux'
import {ISite} from '@jaen/types'
import {graphql, useStaticQuery} from 'gatsby'

import deepmerge from 'deepmerge'

type QueryData = {
  site: ISite
}

const useStaticData = () => {
  let staticData: QueryData

  try {
    staticData = useStaticQuery<QueryData>(graphql`
      query {
        site {
          siteMetadata
        }
      }
    `)
  } catch (e) {
    staticData = {
      site: {siteMetadata: {}}
    }
  }

  return staticData.site
}

export const useSite = () => {
  const staticSite = useStaticData()
  const site = useAppSelector(state => state.site)
  return deepmerge(staticSite, site || {}, {
    arrayMerge: (destinationArray, sourceArray) => {
      // concat and remove duplicates objects from array
      const concat = [...destinationArray, ...sourceArray]

      // remove duplicates
      const unique = concat.filter(
        (item, index) => concat.indexOf(item) === index
      )

      return unique
    }
  })
}
