import {graphql, useStaticQuery} from 'gatsby'
import {useAppSelector} from '../../redux'
import {ISite} from '../../types'

import deepmerge from 'deepmerge'
import {deepmergeArrayIdMerge} from '../../utils/helper'

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
    arrayMerge: deepmergeArrayIdMerge
  })
}
