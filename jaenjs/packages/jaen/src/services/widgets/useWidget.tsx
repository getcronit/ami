import {graphql, useStaticQuery} from 'gatsby'
import React from 'react'
import {store} from '../../redux'
import * as widgetActions from '../../redux/slices/widgets'

const useWidgetStateFromStore = (widgetName: string) => {
  const [state, setState] = React.useState(store.getState().widgets[widgetName])

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState().widgets[widgetName])
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return state
}

export function useWidget<T extends object>(widgetName: string) {
  const dynamicData = useWidgetStateFromStore(widgetName) as T

  const allStaticData = useStaticQuery<{
    jaenInternal: {
      widgets: Array<{
        name: string
        data: T
      }>
    }
  }>(graphql`
    query {
      jaenInternal {
        widgets {
          name
          data
        }
      }
    }
  `)

  const staticData = React.useMemo(() => {
    const widget = allStaticData.jaenInternal?.widgets?.find(
      node => node.name === widgetName
    )

    if (widget) {
      return widget.data
    }
  }, [allStaticData, widgetName])

  const data = React.useMemo(() => {
    if (dynamicData) {
      return dynamicData
    }

    return staticData
  }, [dynamicData, staticData])

  const writeData = (data: T) =>
    store.dispatch(
      widgetActions.writeData({
        widgetName,
        data
      })
    )

  return {
    data,
    writeData
  }
}
