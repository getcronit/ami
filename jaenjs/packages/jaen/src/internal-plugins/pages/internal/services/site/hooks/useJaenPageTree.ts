import React from 'react'
import deepmerge from 'deepmerge'

import {IJaenPage} from '../../../../types'
import {RootState, useAppDeepEqualSelector} from '../../../redux'
import {useStaticJaenPages} from './useStaticJaenPages'

const getStatePages = (state: RootState) =>
  Object.keys(state.internal.pages.nodes).map(id => {
    const {
      slug,
      parent,
      children,
      jaenPageMetadata,
      template,
      deleted,
      excludedFromIndex
    } = state.internal.pages.nodes[id]

    return {
      id,
      ...(slug && {slug}),
      ...(parent !== undefined && {parent}),
      ...(children && {children}),
      ...(jaenPageMetadata && {jaenPageMetadata}),
      ...(template && {template}),
      ...(deleted && {deleted}),
      ...(excludedFromIndex && {excludedFromIndex})
    }
  })

const mergeStaticWithStatePages = (
  staticPages: IJaenPage[],
  statePages: IJaenPage[]
): IJaenPage[] =>
  staticPages
    .concat(
      statePages.filter(
        item => staticPages.findIndex(n => n.id === item.id) === -1
      )
    )
    .map(({id}) => {
      const p1 = staticPages.find(e => e.id === id)
      const p2 = statePages.find(e => e.id === id)

      const merged = deepmerge(p1 || {}, p2 || {}, {
        arrayMerge: (destinationArray, sourceArray) => {
          // concat arrays of objects without duplicates by id
          const array = sourceArray
            .concat(
              destinationArray.filter(
                item => sourceArray.findIndex(n => n.id === item.id) === -1
              )
            )
            .filter(item => !item.deleted)

          return array
        }
      })

      return merged
    })

/**
 * Access the PageTree of the JaenContext and Static.
 */
export const useJaenPageTree = (): IJaenPage[] => {
  const staticPages = useStaticJaenPages()
  const pages = useAppDeepEqualSelector(state =>
    getStatePages(state)
  ) as IJaenPage[]

  const mergeData = React.useMemo(
    () => mergeStaticWithStatePages(staticPages, pages as any),
    [staticPages, pages]
  )

  // Not all jaenpages should end up in the tree
  const filteredData = React.useMemo(
    () =>
      mergeData.filter(
        item =>
          !['JaenPage /', 'JaenPage /admin', 'JaenPage /admin/login'].includes(
            item.id
          )
      ),
    [mergeData]
  )

  return filteredData
}
