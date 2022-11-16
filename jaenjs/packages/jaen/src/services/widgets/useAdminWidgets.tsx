import React from 'react'
import {useWidgets} from './loader'

export const useAdminWidgets = () => {
  const widgets = useWidgets()

  console.log(`widgets`, widgets)

  const [selectedWidgetIndex, setSelectedWidgetIndex] = React.useState<
    number | null
  >(null)

  const handleWidgetClick = (index: number | null) => {
    setSelectedWidgetIndex(index)
  }

  return {
    widgets,
    selectedWidgetIndex,
    toggleWidget: handleWidgetClick
  }
}
