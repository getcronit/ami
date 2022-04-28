import React from 'react'
import {Box} from '@chakra-ui/react'
import {getColor} from '@chakra-ui/theme-tools'

import theme from './theme'

const breakpoints = ['0em', '30em', '48em', '62em', '80em', '96em']

export const mq = breakpoints.map(bp => `@media (min-width: ${bp})`)

/**
 * Create a array of empty boxes to fill the grid
 * if there are less items than the grid size (6-total).
 *
 * @param items
 * @returns
 */
export function gridPadBoxes(items: any[], gridSize: number = 6, Filler = Box) {
  const toFill = gridSize - (items.length % gridSize || gridSize)

  if (toFill > 0) {
    return Array.from({length: toFill}, (_, index) => (
      <Filler key={`grid-pad-${index}`} />
    ))
  }
  return []
}

export function calculateTextColorForBackgroundColor(hexColor: string) {
  const rgb = hexColor
    .replace('#', '')
    .match(/../g)
    ?.map(x => parseInt(x, 16))!
  const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  return luma > 140 ? 'black' : 'white'
}

export function uuidv1() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function replaceHexColorsInHTML(
  html: string,
  coloraHex: string,
  colorbHex: string
) {
  var re = new RegExp(coloraHex, 'g')
  return html.replace(re, colorbHex)
}

export const getThemeColor = (color: string) => (
  getColor(theme, color)
)