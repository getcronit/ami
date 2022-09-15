import {navigate} from 'gatsby'

import {useDisclosure} from '@chakra-ui/react'
import React from 'react'
import {useAppDispatch, useAppSelector} from '../../../internal/redux'
import {internalActions} from '../../../internal/redux/slices'
import {useTemplatesForPage} from '../../../internal/services/page/hooks/useTemplatesForPage'
import {generateOriginPath} from '../../../internal/services/path'
import {useJaenPageTree} from '../../../internal/services/site'
import {IJaenPage, IJaenTemplate} from '../../../types'
import {ContentValues} from '../tabs/Pages/PageContent'
import {CreateValues, PageCreator} from '../tabs/Pages/PageCreator'
import {Items} from '../tabs/Pages/PageTree'

export type PageManagerContextType = {
  onCreate: (
    parentId: string | null,
    values: CreateValues
  ) => {
    payload: Partial<IJaenPage> & {
      id?: string | undefined
      fromId?: string | undefined
    }
    type: string
  }
  onDelete: (id: string) => void
  onMove: (
    id: string,
    oldParentId: string | null,
    newParentId: string | null
  ) => void
  onUpdate: (id: string, values: ContentValues) => void
  onGet: (id: string) => IJaenPage | null
  onNavigate: (id: string) => void
  tree: Items
  templates: IJaenTemplate[]
  isTemplatesLoading: boolean
  rootPageId: string
  onToggleCreator: (parentId: string | null) => void
}

export const PageManagerContext = React.createContext<
  PageManagerContextType | undefined
>(undefined)

export const usePageManager = () => {
  const context = React.useContext(PageManagerContext)
  if (!context) {
    throw new Error('usePageManager must be used within a PageManagerProvider')
  }
  return context
}

export const PageManagerProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  const rootPageId = 'JaenPage /'

  const dispatch = useAppDispatch()

  const pageTree = useJaenPageTree()

  const latestAddedPageId = useAppSelector(
    state => state.internal.pages.lastAddedNodeId
  )

  const dynamicPaths = useAppSelector(
    state => state.internal.routing.dynamicPaths
  )

  let [shouldUpdateDpathsFor, setShouldUpdateDpathsFor] = React.useState<{
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
    (id: string) => {
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
      // Navigate to /jaen/r/:path if dynamic, else to /:path
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
          path = `/jaen/r#${path}`
        }

        navigate(path)
      }
    },
    [pageTree, dynamicPaths]
  )

  const treeItems = React.useMemo(() => {
    const items = pageTree.reduce((a, v) => {
      return {
        ...a,
        [v.id]: pageToTreeNode(v)
      }
    }, {}) as Items

    delete items[rootPageId]

    return items
  }, [pageTree])

  const [creatorState, setCreatorState] = React.useState<{
    parentId: string | null
  } | null>(null)

  const parentCreatorPage = React.useMemo(
    () =>
      creatorState?.parentId ? handlePageGet(creatorState.parentId) : null,
    [creatorState]
  )

  const templates = useTemplatesForPage(parentCreatorPage)

  console.log(`templates`, templates)

  const creator = useDisclosure()

  const handleCreatorToggle = (parentId: string | null) => {
    setCreatorState({
      parentId
    })
    creator.onToggle()
  }

  const handleCreatorClose = () => {
    setCreatorState(null)
    creator.onClose()
  }

  const handleCreatorSubmit = (values: CreateValues) => {
    if (creatorState) {
      handlePageCreate(creatorState?.parentId, values)
    }

    handleCreatorClose()
  }

  return (
    <PageManagerContext.Provider
      value={{
        onCreate: handlePageCreate,
        onDelete: handlePageDelete,
        onMove: handlePageMove,
        onUpdate: handlePageUpdate,
        onGet: handlePageGet,
        onNavigate: handlePageNavigate,
        tree: treeItems,
        templates: templates.allTemplates,
        isTemplatesLoading: templates.isLoading,
        rootPageId,
        onToggleCreator: handleCreatorToggle
      }}>
      <PageCreator
        finalFocusRef={null as any}
        isTemplatesLoading={templates.isLoading}
        values={{
          title: '',
          slug: '',
          template: {
            name: '',
            displayName: ''
          }
        }}
        templates={templates.templates}
        isOpen={creator.isOpen}
        onClose={handleCreatorClose}
        onSubmit={handleCreatorSubmit}
        externalValidation={(name, value) => {
          return pageUpdateValidation({
            name,
            value,
            treeItems,
            parentId: creatorState?.parentId
          })
        }}
      />

      {children}
    </PageManagerContext.Provider>
  )
}

export function pageUpdateValidation({
  name,
  value,
  parentId,
  treeItems
}: {
  name: string
  value: string
  parentId: string | null | undefined
  treeItems: Items
}) {
  if (name === 'slug') {
    let siblings

    if (parentId) {
      siblings = treeItems[parentId].children
    } else {
      siblings = Object.keys(treeItems)
    }

    const slugTaken = siblings.some(
      siblingId => treeItems[siblingId]?.data?.slug === value
    )

    if (slugTaken) {
      return 'Slug is already taken'
    }
  }
}

function pageToTreeNode(v: IJaenPage) {
  return {
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
