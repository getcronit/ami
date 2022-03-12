import {RootState, useAppDeepEqualSelector} from '../../redux'
import deepmerge from 'deepmerge'
import {graphql, useStaticQuery} from 'gatsby'
import * as React from 'react'
import {useSiteContext} from '.'
import {IJaenPage, IJaenTemplate, ITreeJaenPage} from '../../../types'

type QueryData = {
  allJaenPage: {
    nodes: ITreeJaenPage[]
  }
  jaenTemplates: {
    nodes: Array<{
      name: string
      relativePath: string
    }>
  }
}

export const useStaticData = () => {
  let staticData: QueryData

  try {
    staticData = useStaticQuery<QueryData>(graphql`
      query {
        jaenTemplates: allFile(
          filter: {sourceInstanceName: {eq: "templates"}}
        ) {
          nodes {
            name
            relativePath
          }
        }
        allJaenPage {
          nodes {
            id
            slug
            parent {
              id
            }
            children {
              id
            }
            jaenPageMetadata {
              title
              isBlogPost
              image
              description
              datePublished
              canonical
            }
            template
            excludedFromIndex
          }
        }
      }
    `)
  } catch (e) {
    staticData = {
      allJaenPage: {
        nodes: []
      },
      jaenTemplates: {
        nodes: []
      }
    }
  }

  return staticData
}

/**
 * Access the JaenTemplates
 */
export const useJaenTemplates = () => {
  const site = useSiteContext()
  const data = useStaticData()

  const [templates, setTemplates] = React.useState<{
    [name: string]: IJaenTemplate
  } | null>(null)

  React.useEffect(() => {
    const templateNodes = data.jaenTemplates.nodes

    const load = async () => {
      const tmpls: {[name: string]: IJaenTemplate} = {}

      for (const templateNode of templateNodes) {
        const {name: loadTemplate} = templateNode

        if (loadTemplate && !(loadTemplate in (templates || {}))) {
          const Component = await site.templateLoader(loadTemplate)
          const children = []

          for (const child of Component.options.children) {
            const ad = await site.templateLoader(child)
            children.push({
              name: child,
              displayName: ad.options.displayName
            })
          }

          tmpls[loadTemplate] = {
            name: loadTemplate,
            displayName: Component.options.displayName,
            children,
            isRootTemplate: Component.options.isRootTemplate
          }
        }
      }

      setTemplates(tmpls)
    }

    load()
  }, [])

  const templatesArray = React.useMemo(() => Object.values(templates || {}), [
    templates
  ])

  return templatesArray
}

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
  staticPages: ITreeJaenPage[],
  statePages: IJaenPage[]
): ITreeJaenPage[] =>
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
export const useJaenPageTree = (): ITreeJaenPage[] => {
  const staticData = useStaticData()
  const pages = useAppDeepEqualSelector(state =>
    getStatePages(state)
  ) as ITreeJaenPage[]

  const mergeData = React.useMemo(
    () => mergeStaticWithStatePages(staticData.allJaenPage.nodes, pages as any),
    [staticData, pages]
  )

  // Not all jaenpages should end up in the tree
  const filteredData = React.useMemo(
    () =>
      mergeData.filter(
        item => !['JaenPage /', 'JaenPage /jaen/admin'].includes(item.id)
      ),
    [mergeData]
  )

  return filteredData
}
