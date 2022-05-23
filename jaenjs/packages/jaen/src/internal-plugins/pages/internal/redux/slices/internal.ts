import {omitSingle} from '../../../../../utils/helper'
import {combineReducers, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid'
import {IJaenPage, JaenFieldsOrderEntry} from '../../../types'
import {generatePagePaths} from '../../services/path'
import {IJaenSection, IJaenSectionWithId, IJaenState} from '../types'

export const initialState: IJaenState = {
  status: {
    isEditing: false
  },
  pages: {
    lastAddedNodeId: undefined,
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
        chapterName: string
        sectionName: string
        between: [IJaenSectionWithId | null, IJaenSectionWithId | null]
      }>
    ) {
      const {pageId, chapterName, sectionName, between} = action.payload

      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || []
      }

      const page = state.nodes[pageId]

      page.chapters = page.chapters || {}

      if (!page.chapters[chapterName]?.sections) {
        // @ts-ignore - This is a hack to ignore the fact that no head or tail pointer is defined
        page.chapters[chapterName] = {
          sections: {}
        }
      }

      const chapter = page.chapters[chapterName]

      // Generate a new id in the pattern of `JaenSection {uuid}`
      const sectionId = `JaenSection ${uuidv4()}`

      const [prev, next] = between

      if (!prev && !next) {
        // If the before and after are not defined, add the section without changing
        // the pointers of other sections

        chapter.sections = {
          ...chapter.sections,
          [sectionId]: {
            name: sectionName,
            ptrPrev: null,
            ptrNext: null,
            jaenFields: null
          }
        }

        // Set head and tail pointers
        chapter.ptrHead = sectionId
        chapter.ptrTail = sectionId
      } else if (prev && !next) {
        // If the after is defined, add the section before the after
        chapter.sections = {
          ...chapter.sections,
          [sectionId]: {
            name: sectionName,
            ptrPrev: prev.id,
            ptrNext: null,
            jaenFields: null
          },
          [prev.id]: {
            ...chapter.sections[prev.id],
            ptrNext: sectionId
          }
        }

        // Set head and tail pointers
        chapter.ptrTail = sectionId
      } else if (!prev && next) {
        // If the before is defined, add the section after the before

        chapter.sections = {
          ...chapter.sections,
          [sectionId]: {
            name: sectionName,
            ptrPrev: null,
            ptrNext: next.id,
            jaenFields: null
          },
          [next.id]: {
            ...chapter.sections[next.id],
            ptrPrev: sectionId
          }
        }

        // Set head and tail pointers
        chapter.ptrHead = sectionId
      } else if (prev && next) {
        // cannot use else here because of the null check
        // If both before and after are defined, add the section between the before and after

        chapter.sections = {
          ...chapter.sections,
          [sectionId]: {
            name: sectionName,
            ptrPrev: prev.id,
            ptrNext: next.id,
            jaenFields: null
          },
          [prev.id]: {
            ...chapter.sections[prev.id],
            ptrNext: sectionId
          },
          [next.id]: {
            ...chapter.sections[next.id],
            ptrPrev: sectionId
          }
        }
      }

      return state
    },
    section_remove(
      state,
      action: PayloadAction<{
        pageId: string
        chapterName: string
        sectionId: string
        between: [IJaenSectionWithId | null, IJaenSectionWithId | null]
      }>
    ) {
      const {pageId, chapterName, sectionId, between} = action.payload

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || []
      }

      const page = state.nodes[pageId]

      page.chapters = page.chapters || {}

      if (!page.chapters[chapterName]?.sections) {
        // @ts-ignore - This is a hack to ignore the fact that no head or tail pointer is defined
        page.chapters[chapterName] = {
          sections: {}
        }
      }

      const chapter = page.chapters[chapterName]

      // Remove the section from the chapter
      chapter.sections = {
        ...chapter.sections,
        [sectionId]: {
          ...chapter.sections[sectionId],
          deleted: true
        }
      }

      //> It is required to rearrange the pointers of the between sections
      let [prev, next] = between

      const prevWithoutId = prev && (omitSingle('id', prev) as IJaenSection)
      const nextWithoutId = next && (omitSingle('id', next) as IJaenSection)

      if (prev && !next) {
        // If next is not defined:
        // - set the prev section's next pointer to null
        // - set the tail pointer to the prev section's id

        chapter.sections = {
          ...chapter.sections,
          [prev.id]: {
            ...chapter.sections[prev.id],
            ...prevWithoutId,
            ptrNext: null
          }
        }

        chapter.ptrTail = prev.id
      } else if (!prev && next) {
        // If prev is not defined:
        // - set the next section's prev pointer to null
        // - set the head pointer to the next section's id

        chapter.sections = {
          ...chapter.sections,
          [next.id]: {
            ...chapter.sections[next.id],
            ...nextWithoutId,
            ptrPrev: null
          }
        }

        chapter.ptrHead = next.id
      } else if (prev && next) {
        // If both prev and next are defined:
        // - set the prev section's next pointer to the next section's id
        // - set the next section's prev pointer to the prev section's id

        chapter.sections = {
          ...chapter.sections,
          [prev.id]: {
            ...chapter.sections[prev.id],
            ...prevWithoutId,
            ptrNext: next.id
          },
          [next.id]: {
            ...chapter.sections[next.id],
            ...nextWithoutId,
            ptrPrev: prev.id
          }
        }
      } else {
        // If both prev and next are not defined:
        // - set the head and tail pointers to null

        chapter.ptrHead = null
        chapter.ptrTail = null
      }

      return state
    },

    page_unregisterFields(
      state,
      action: PayloadAction<{
        pageId: string
      }>
    ) {
      const {pageId} = action.payload

      console.log('dispatching unregister for ', pageId)

      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || [],
        jaenFieldsOrder: []
      }
    },

    field_register(
      state,
      action: PayloadAction<
        {
          pageId: string
        } & JaenFieldsOrderEntry
      >
    ) {
      const {pageId, ...rest} = action.payload

      console.log('dispatching field_register for ', pageId)

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        children: state.nodes[pageId]?.children || [],
        jaenFieldsOrder: (state.nodes[pageId]?.jaenFieldsOrder || []).concat([
          rest
        ])
      }

      // remove duplicates
      state.nodes[pageId].jaenFieldsOrder = state.nodes[
        pageId
      ].jaenFieldsOrder!.filter(
        (entry, index, self) =>
          index ===
          self.findIndex(
            t =>
              t.name == entry.name &&
              t.type == entry.type &&
              t.chapter?.name == entry.chapter?.name &&
              t.chapter?.sectionId == entry.chapter?.sectionId
          )
      )
    },

    field_write(
      state,
      action: PayloadAction<{
        pageId: string
        section?: {chapterName: string; sectionId: string}
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
        page.chapters = page.chapters || {}

        if (!page.chapters[section.chapterName]?.sections) {
          // @ts-ignore - This is a hack to ignore the fact that no head or tail pointer is defined
          page.chapters[section.chapterName] = {
            sections: {}
          }
        }

        const chapter = page.chapters[section.chapterName]

        if (!chapter.sections[section.sectionId]?.jaenFields) {
          chapter.sections[section.sectionId] = {
            ...chapter.sections[section.sectionId],
            jaenFields: {}
          }
        }

        const sectionFields = chapter.sections[section.sectionId].jaenFields

        // @ts-ignore
        sectionFields[fieldType] = {
          ...sectionFields?.[fieldType],
          [fieldName]: value
        }
      } else {
        page.jaenFields = page.jaenFields || {}
        page.jaenFields[fieldType] = {
          ...page.jaenFields[fieldType],
          [fieldName]: value
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
