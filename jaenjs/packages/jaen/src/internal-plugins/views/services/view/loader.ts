import {graphql, PageProps, useStaticQuery} from 'gatsby'
import * as React from 'react'
import {IViewConnection} from './context'

type QueryData = {
  jaenViews: {
    nodes: Array<{
      name: string
      relativePath: string
    }>
  }
}

const useStaticData = () => {
  let staticData: QueryData

  try {
    staticData = useStaticQuery<QueryData>(graphql`
      query {
        jaenViews: allFile(filter: {sourceInstanceName: {eq: "jaen-views"}}) {
          nodes {
            name
            relativePath
          }
        }
      }
    `)
  } catch (e) {
    staticData = {
      jaenViews: {
        nodes: []
      }
    }
  }

  return staticData
}

const viewLoader = (relativePath: string): IViewConnection => {
  return (
    //@ts-ignore
    require(`${___JAEN_VIEWS___}/${relativePath}`).default
  )
}

export const useViews = () => {
  const staticData = useStaticData()

  const views = React.useMemo(() => {
    const nodes = staticData.jaenViews.nodes
    return nodes.map(({relativePath}) => viewLoader(relativePath))
  }, [staticData])

  return views
}
