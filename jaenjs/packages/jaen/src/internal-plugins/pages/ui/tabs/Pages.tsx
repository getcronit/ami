import {navigate} from 'gatsby'
import * as React from 'react'
import {useAppDispatch, useAppSelector, withRedux} from '../../internal/redux'
import {internalActions} from '../../internal/redux/slices'
import {generateOriginPath} from '../../internal/services/path'
import {useJaenPageTree, useJaenTemplates} from '../../internal/services/site'
import PagesTab from '../components/tabs/Pages'
import {ContentValues} from '../components/tabs/Pages/PageContent'
import {CreateValues} from '../components/tabs/Pages/PageCreator'

export const PagesContainer = withRedux(() => {
  const dispatch = useAppDispatch()
  const pageTree = useJaenPageTree()
  const jaenTemplates = useJaenTemplates()

  const latestAddedPageId = useAppSelector(
    state => state.internal.pages.lastAddedNodeId
  )

  const dynamicPaths = useAppSelector(
    state => state.internal.routing.dynamicPaths
  )

  let [shouldUpdateDpathsFor, setShouldUpdateDpathsFor] =
    React.useState<{
      pageId: string
      create: boolean
    } | null>(null)

  React.useEffect(() => {
    if (shouldUpdateDpathsFor) {
      const {pageId, create} = shouldUpdateDpathsFor

      dispatch(
        internalActions.updateDynamicPaths({
          jaenPageTree: pageTree,
          pageId,
          create
        })
      )

      setShouldUpdateDpathsFor(null)
    }
  }, [pageTree])

  React.useEffect(() => {
    if (latestAddedPageId) {
      dispatch(
        internalActions.updateDynamicPaths({
          jaenPageTree: pageTree,
          pageId: latestAddedPageId,
          create: true
        })
      )
    }
  }, [latestAddedPageId])

  const handlePageGet = React.useCallback(
    id => {
      let jaenPage = pageTree.find(p => p.id === id)

      // TODO: Remove workaround
      if (!jaenPage) {
        jaenPage = pageTree.find(p => p.id === latestAddedPageId)
      }

      if (!jaenPage) {
        return null
      }

      return jaenPage
    },
    [pageTree]
  )

  const handlePageCreate = React.useCallback(
    (parentId: string | null, values: CreateValues) =>
      dispatch(
        internalActions.page_updateOrCreate({
          parent: parentId ? {id: parentId} : null,
          slug: values.slug,
          jaenPageMetadata: {
            title: values.title
          },
          template: values.template.name
        })
      ),
    []
  )

  const handlePageDelete = React.useCallback((id: string) => {
    setShouldUpdateDpathsFor({pageId: id, create: false})

    dispatch(internalActions.page_markForDeletion(id))
  }, [])

  const handlePageMove = React.useCallback(
    (id: string, oldParentId: string | null, newParentId: string | null) => {
      setShouldUpdateDpathsFor({pageId: id, create: true})
      dispatch(
        internalActions.page_updateOrCreate({
          id,
          parent: newParentId ? {id: newParentId} : null,
          fromId: oldParentId || undefined
        })
      )
    },
    []
  )

  const handlePageUpdate = React.useCallback(
    (id: string, values: ContentValues) => {
      setShouldUpdateDpathsFor({pageId: id, create: true})

      dispatch(
        internalActions.page_updateOrCreate({
          id,
          slug: values.slug,
          jaenPageMetadata: {
            title: values.title,
            description: values.description,
            image: values.image
          },
          excludedFromIndex: values.excludedFromIndex
        })
      )
    },
    []
  )

  const handlePageNavigate = React.useCallback(
    (id: string) => {
      // Check if the page is a dynamic or static page.
      // Navigate to /_/:path if dynamic, else to /:path
      let node = pageTree.find(p => p.id === id)

      if (!node) {
        node = pageTree.find(p => p.id === latestAddedPageId)!
      }

      let path = generateOriginPath(pageTree, node)

      // if (path === '/') {
      //   path += node.slug
      // } else {
      //   path += '/' + node.slug
      // }

      if (path) {
        if (dynamicPaths && path in dynamicPaths) {
          path = `/_#${path}`
        }

        navigate(path)
      }
    },
    [pageTree, dynamicPaths]
  )

  const treeItems = React.useMemo(
    () =>
      pageTree
        .filter(e => !['JaenPage /'].includes(e.id))
        .reduce((a, v) => {
          return {
            ...a,
            [v.id]: {
              id: v.id,
              children: v.children.map(child => child.id),
              data: {
                title: v.jaenPageMetadata.title,
                slug: v.slug,
                template: v.template,
                hasChanges: false,
                deleted: v.deleted
              },
              parent: v.parent?.id || null
            }
          }
        }, {}),
    [pageTree]
  )

  return (
    <PagesTab
      items={treeItems}
      templates={jaenTemplates}
      creatorFallbackTemplates={jaenTemplates}
      getPage={handlePageGet}
      onItemCreate={handlePageCreate}
      onItemDelete={handlePageDelete}
      onItemMove={handlePageMove}
      onPageUpdate={handlePageUpdate}
      onItemSelect={id => null}
      onItemDoubleClick={handlePageNavigate}
    />
  )
})

export default PagesContainer
