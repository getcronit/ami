import {graphql, useStaticQuery} from 'gatsby'
import * as React from 'react'
import {IWidgetConnection} from './context'

type QueryData<T> = {
  jaenWidgets: {
    nodes: Array<{
      name: string
      relativePath: string
    }>
  }
  jaenInternal: {
    widgets: Array<{
      name: string
      data: T
    }>
  }
}

const useStaticData = <T extends object>() => {
  let staticData: QueryData<T>

  try {
    staticData = useStaticQuery<QueryData<T>>(graphql`
      query {
        jaenWidgets: allFile(
          filter: {sourceInstanceName: {eq: "jaen-widgets"}}
        ) {
          nodes {
            name
            relativePath
          }
        }
        jaenInternal {
          widgets {
            name
            data
          }
        }
      }
    `)
  } catch (e) {
    staticData = {
      jaenWidgets: {
        nodes: []
      },
      jaenInternal: {
        widgets: []
      }
    }
  }

  return staticData
}

const widgetLoader = (relativePath: string): IWidgetConnection => {
  return (
    //@ts-ignore
    require(`${___JAEN_WIDGETS___}/${relativePath}`).default
  )
}

export const useWidgets = () => {
  const staticData = useStaticData()

  const views = React.useMemo(() => {
    const nodes = staticData.jaenWidgets.nodes
    return nodes.map(({relativePath}) => widgetLoader(relativePath))
  }, [staticData])

  return views
}
