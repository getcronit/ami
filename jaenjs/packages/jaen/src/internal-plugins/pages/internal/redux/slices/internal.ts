import {combineReducers, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid'
import {IJaenPage, JaenSectionPath} from '../../../types'
import {findSection, insertSectionIntoTree} from '../../../utils'
import {generatePagePaths} from '../../services/path'
import {JaenSectionType} from '../../services/section'
import {IJaenState} from '../types'

export const initialState: IJaenState = {
  status: {
    isEditing: false
  },
  pages: {
    lastAddedNodeId: undefined,
    registeredPageFields: {},
    nodes: {}
  },
  routing: {
    dynamicPaths: {}
  }
}

const statusSlice = createSlice({
  name: 'status',
  initialState: initialState.status,
  reducers: {
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload
    }
  }
})

const pagesSlice = createSlice({
  name: 'pages',
  initialState: initialState.pages,
  reducers: {
    page_updateOrCreate(
      state,
      action: PayloadAction<
        IJaenState['pages']['nodes'][string] & {
          id?: string
          fromId?: string
        }
      >
    ) {
      let {
        id,
        slug,
        jaenFields,
        jaenPageMetadata,
        parent,
        children,
        template,
        excludedFromIndex,
        fromId
      } = action.payload

      const parentId = parent?.id || null

      // Check if the page is being updated or created
      if (id) {
        // Update the page
        const toBeAddedData = {
          id,
          ...(slug && {slug}),
          ...(jaenFields !== undefined && {jaenFields}),
          ...(jaenPageMetadata && {jaenPageMetadata}),
          ...(parent !== undefined && {parent}),
          ...(children && {children}),
          ...(excludedFromIndex !== undefined && {excludedFromIndex})
        }

        state.nodes[id] = {
          ...state.nodes[id],
          ...toBeAddedData
        }

        // If `fromId` then remove the page from the fromPage children
        if (fromId && (parentId || parentId === null)) {
          // Update the from page
          // If the fromIndex is not found, add the fromPage to the state and set the from index

          const newChildren = [
            ...(state.nodes[fromId]?.children || []).filter(e => e.id !== id),
            {
              id,
              deleted: true
            }
          ]

          state.nodes[fromId] = {
            ...state.nodes[fromId],
            children: newChildren
          }
        }
      } else {
        // If `fromId` is defined, throw an error because a page move is not supported on creation.
        if (fromId) {
          throw new Error(`Cannot move a page that is being created.`)
        }

        // Generate a new id in the pattern of `JaenPage {uuid}`
        id = `JaenPage ${uuidv4()}`

        // Create the page
        state.nodes[id] = {
          slug,
          jaenFields: jaenFields || null,
          jaenPageMetadata: jaenPageMetadata || {
            title: 'New Page'
          },
          parent: parent || null,
          children: children || [],
          template,
          excludedFromIndex
        }

        state.lastAddedNodeId = id
      }

      // Add the page to the new parents' children
      if (parentId) {
        state.nodes[parentId] = {
          ...state.nodes[parentId],
          children: state.nodes[parentId]?.children
            ? [...(state.nodes[parentId]?.children || []), {id}]
            : [{id}]
        }
      }

      return state
    },
    page_markForDeletion(state, action: PayloadAction<string>) {
      const id = action.payload

      state.nodes[id] = {
        ...state.nodes[id],
        deleted: true,
        children: state.nodes[id]?.children || []
      }

      return state
    },

    section_add(
      state,
      action: PayloadAction<{
        pageId: string
        // The larger the index, the more nested the section
        path: JaenSectionPath
        sectionItemType: string
        between: [string | null, string | null]
      }>
    ) {
      const {pageId, path, sectionItemType, between} = action.payload

      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || []
      }

      const page = state.nodes[pageId]
      const sections = page.sections || []

      console.log(
        'section_add',
        JSON.parse(JSON.stringify(sections)),
        path,
        between,
        sectionItemType
      )

      const s = insertSectionIntoTree(sections, path, {
        between,
        sectionItemData: {
          type: sectionItemType
        }
      })

      console.log('s', s)

      page.sections = sections

      return state
    },
    section_remove(
      state,
      action: PayloadAction<{
        pageId: string
        path: JaenSectionPath
        sectionId: string
        between: [string | null, string | null]
      }>
    ) {
      const {pageId, path, sectionId, between} = action.payload

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || []
      }

      const page = state.nodes[pageId]
      const sections = page.sections || []

      insertSectionIntoTree(sections, path, {
        between,
        sectionId,
        shouldDelete: true
      })

      page.sections = sections

      return state
    },

    section_register(
      state,
      action: PayloadAction<{
        pageId: string
        path: JaenSectionPath
        props?: object
      }>
    ) {
      const {pageId, path, props} = action.payload

      const position = state.registeredPageFields[pageId] || 0

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || []
      }

      const page = state.nodes[pageId]
      const sections = page.sections || []

      const section = findSection(sections, path)

      if (section) {
        section.position = position
        section.props = props
      }

      page.sections = sections

      state.registeredPageFields[pageId] = position + 1

      return state
    },
    page_unregisterFields(
      state,
      action: PayloadAction<{
        pageId: string
      }>
    ) {
      const {pageId} = action.payload

      state.registeredPageFields = {
        ...state.registeredPageFields,
        [pageId]: 0
      }
    },

    field_register(
      state,
      action: PayloadAction<{
        pageId: string
        fieldType: string
        fieldName: string
        section?: JaenSectionType
        props: object
      }>
    ) {
      const {pageId, section, fieldType, fieldName, props} = action.payload

      const position = state.registeredPageFields[pageId] || 0

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || [],
        sections: state.nodes[pageId]?.sections || []
      }

      const page = state.nodes[pageId]

      if (section) {
        const sections = page.sections || []

        insertSectionIntoTree(sections, section.path, {
          sectionId: section.id,
          sectionItemData: {
            // @ts-ignore
            jaenFields: {
              [fieldType]: {
                [fieldName]: {
                  position,
                  props
                }
              }
            }
          }
        })
      } else {
        page.jaenFields = page.jaenFields || {}
        page.jaenFields[fieldType] = {
          ...page.jaenFields[fieldType],
          [fieldName]: {
            ...page.jaenFields[fieldType]?.[fieldName],
            position,
            props
          }
        }
      }

      state.registeredPageFields[pageId] = position + 1
    },

    field_write(
      state,
      action: PayloadAction<{
        pageId: string
        section?: JaenSectionType
        fieldType: string
        fieldName: string
        value: any
      }>
    ) {
      const {pageId, section, fieldType, fieldName, value} = action.payload

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || []
      }

      const page = state.nodes[pageId]

      // If the page is found, add the field

      if (section) {
        const sections = page.sections || []

        insertSectionIntoTree(sections, section.path, {
          sectionId: section.id,
          sectionItemData: {
            jaenFields: {
              [fieldType]: {
                [fieldName]: {
                  value
                }
              }
            }
          }
        })
      } else {
        page.jaenFields = page.jaenFields || {}
        page.jaenFields[fieldType] = {
          ...page.jaenFields[fieldType],
          [fieldName]: {
            ...page.jaenFields[fieldType]?.[fieldName],
            value
          }
        }
      }

      return state
    },

    discardAllChanges(state) {
      state.nodes = {}
      state.lastAddedNodeId = undefined
      return state
    },

    discardChanges(state, action: PayloadAction<{pageId: string}>) {
      const {pageId} = action.payload
      delete state.nodes[pageId]

      if (state.lastAddedNodeId === pageId) {
        state.lastAddedNodeId = undefined
      }

      return state
    }
  }
})

const routingSlice = createSlice({
  name: 'routing',
  initialState: initialState.routing,
  reducers: {
    updateDynamicPaths(
      state,
      action: PayloadAction<{
        jaenPageTree: IJaenPage[]
        pageId: string
        create?: boolean
      }>
    ) {
      const {jaenPageTree, pageId, create} = action.payload

      const dynamicIds = Object.fromEntries(
        Object.entries(state.dynamicPaths).map(([k, v]) => [v.pageId, k])
      )

      const node = jaenPageTree.find(node => node.id === pageId)

      const paths = generatePagePaths(jaenPageTree, pageId)

      for (const path in paths) {
        const pageId = paths[path]

        if (pageId in dynamicIds) {
          const oldPath = dynamicIds[pageId]
          delete state.dynamicPaths[oldPath]
        }

        if (create) {
          state.dynamicPaths[path] = {
            pageId,
            templateName: node?.template!
          }
        }
      }
    },
    discardDynamicPaths(state) {
      state.dynamicPaths = {}
    }
  }
})

export const actions = {
  ...statusSlice.actions,
  ...pagesSlice.actions,
  ...routingSlice.actions
}
export const reducers = {
  status: statusSlice.reducer,
  pages: pagesSlice.reducer,
  routing: routingSlice.reducer
}

export default combineReducers(reducers)
