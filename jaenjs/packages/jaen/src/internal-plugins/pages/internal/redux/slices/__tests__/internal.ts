import {IJaenState} from '../../types'
import {actions, initialState, reducers} from '../internal'

const state: IJaenState = {
  status: {
    isEditing: false,
    changes: {}
  },
  pages: {
    nodes: {
      'JaenPage foo-bar-baz-1': {
        parent: null,
        children: [],
        slug: 'test',
        jaenPageMetadata: {
          title: 'test',
          isBlogPost: true,
          image: 'test',
          description: 'test',
          datePublished: 'test',
          canonical: 'test'
        },
        chapters: {
          Chapter1: {
            ptrHead: 'JaenSection foo-bar-baz-1',
            ptrTail: 'JaenSection foo-bar-baz-2',
            sections: {
              'JaenSection foo-bar-baz-1': {
                jaenFields: null,
                name: 'AboutSection',
                ptrNext: 'JaenSection foo-bar-baz-2',
                ptrPrev: null // this is the first section of the chapter
              },
              'JaenSection foo-bar-baz-2': {
                jaenFields: null,
                name: 'AboutSection',
                ptrNext: null, // this is the last section of the chapter
                ptrPrev: 'JaenSection foo-bar-baz-1'
              }
            }
          },
          Chapter2: {
            ptrHead: 'JaenSection foo-bar-baz-3',
            ptrTail: 'JaenSection foo-bar-baz-5',
            sections: {
              'JaenSection foo-bar-baz-3': {
                jaenFields: null,
                name: 'AboutSection',
                ptrNext: 'JaenSection foo-bar-baz-4',
                ptrPrev: null // this is the first section of the chapter
              },
              'JaenSection foo-bar-baz-4': {
                jaenFields: null,
                name: 'AboutSection',
                ptrNext: 'JaenSection foo-bar-baz-5',
                ptrPrev: 'JaenSection foo-bar-baz-3'
              },
              'JaenSection foo-bar-baz-5': {
                jaenFields: null,
                name: 'AboutSection',
                ptrNext: null, // this is the last section of the chapter
                ptrPrev: 'JaenSection foo-bar-baz-4'
              }
            }
          }
        }
      },
      'JaenPage foo-bar-baz-2': {
        parent: null,
        children: [
          {
            id: 'JaenPage foo-bar-baz-2-1'
          },
          {id: 'JaenPage foo-bar-baz-2-2'}
        ],
        slug: 'test-2',
        jaenPageMetadata: {
          title: 'test',
          isBlogPost: true,
          image: 'test',
          description: 'test',
          datePublished: 'test',
          canonical: 'test'
        }
      },
      'JaenPage foo-bar-baz-2-1': {
        parent: {
          id: 'JaenPage foo-bar-baz-2'
        },
        children: [],
        slug: 'test-2',
        jaenPageMetadata: {
          title: 'test',
          isBlogPost: true,
          image: 'test',
          description: 'test',
          datePublished: 'test',
          canonical: 'test'
        }
      },
      'JaenPage foo-bar-baz-2-2': {
        parent: {
          id: 'JaenPage foo-bar-baz-2'
        },
        children: [],
        slug: 'test-2',
        jaenPageMetadata: {
          title: 'test',
          isBlogPost: true,
          image: 'test',
          description: 'test',
          datePublished: 'test',
          canonical: 'test'
        }
      }
    }
  },
  routing: {
    dynamicPaths: {}
  }
}

describe('status', () => {
  const reducer = reducers.status
  const previousState = state.status

  it('should set isEditing to true', () => {
    const result = reducer(previousState, actions.setIsEditing(true))
    expect(result.isEditing).toBe(true)
  })
})

describe('pages', () => {
  const reducer = reducers.pages
  const previousState = state.pages

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState.pages)
  })

  describe('page_updateOrCreate', () => {
    test('should handle a page creation with a empty payload', () => {
      const result = reducer(
        initialState.pages,
        actions.page_updateOrCreate({})
      )

      // Expect the result to be not bigger than length 1
      expect(Object.keys(result.nodes).length).toBe(1)

      expect(
        result.nodes[
          Object.keys(result.nodes)[Object.keys(result.nodes).length - 1]
        ]
      ).toEqual(
        expect.objectContaining({
          children: [],
          parent: null,
          slug: undefined,
          jaenFields: null,
          jaenPageMetadata: {title: 'New Page'}
        })
      )
    })
    test('should handle a page creation with payload', () => {
      const jaenPageMetadata = {
        title: 'test',
        isBlogPost: true,
        image: 'test',
        description: 'test',
        datePublished: 'test',
        canonical: 'test'
      }

      const {nodes: result} = reducer(
        initialState.pages,
        actions.page_updateOrCreate({
          slug: 'test',
          jaenPageMetadata
        })
      )

      expect(
        result[Object.keys(result)[Object.keys(result).length - 1]]
      ).toEqual(
        expect.objectContaining({
          children: [],
          parent: null,
          slug: 'test',
          jaenFields: null,
          jaenPageMetadata
        })
      )
    })
    test('should create a page with a parent (state contains parent page)', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate({
          slug: 'test',
          parent: {id: 'JaenPage foo-bar-baz-1'},
          jaenPageMetadata: {title: 'New Page'}
        })
      )

      // Expect that the result is one bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length + 1
      )

      const parentPage = result['JaenPage foo-bar-baz-1']
      const addedId = Object.keys(result)[Object.keys(result).length - 1]

      // Expect that addedPage.id is in the children of the parentPage
      expect(parentPage.children).toEqual(
        expect.arrayContaining([expect.objectContaining({id: addedId})])
      )
    })
    test('should create a page with a parent (state does not contain parent page)', () => {
      const payload = {
        slug: 'test',
        parent: {id: 'JaenPage foo-bar-baz-1'},
        jaenPageMetadata: {title: 'New Page'}
      }

      const {nodes: result} = reducer(
        initialState.pages,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is two bigger
      expect(Object.keys(result).length).toBe(2)

      const parentPage = result['JaenPage foo-bar-baz-1']

      const addedId = Object.keys(result)[0]
      const addedPage = result[addedId]

      // Expect that addedPage.id is in the children of the parentPage
      expect(parentPage.children).toEqual(
        expect.arrayContaining([expect.objectContaining({id: addedId})])
      )

      // Expect that the parentPage is the actual parent of the addedPage
      expect(addedPage.parent?.id).toEqual('JaenPage foo-bar-baz-1')
    })
    test('should handle a slug update (state contains page)', () => {
      const payload = {
        slug: 'test-2',
        id: 'JaenPage foo-bar-baz-1'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is not bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length
      )

      // Expect the slug to be updated
      expect(result[payload.id].slug).toBe(payload.slug)
    })
    test('should handle a slug update (state does not contain page)', () => {
      const payload = {
        slug: 'test-2',
        id: 'JaenPage foo-bar-baz-2'
      }

      const {nodes: result} = reducer(
        initialState.pages,
        actions.page_updateOrCreate(payload)
      )

      // Expect the result to be length 1
      expect(Object.keys(result).length).toBe(1)

      // Expect the slug to be updated
      expect(result['JaenPage foo-bar-baz-2'].slug).toBe(payload.slug)
    })
    test('should handle a jaenPageMetadata update', () => {
      const payload = {
        id: 'JaenPage foo-bar-baz-1',
        jaenPageMetadata: {
          title: 'This is a updated title',
          isBlogPost: false,
          image: 'updated image',
          description: 'updated description',
          datePublished: 'updated datePublished',
          canonical: 'updated canonical'
        }
      }

      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is not bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length
      )

      // Expect the jaenPageMetadata to be updated
      expect(result['JaenPage foo-bar-baz-1'].jaenPageMetadata).toEqual(
        expect.objectContaining(payload.jaenPageMetadata)
      )
    })
    test('should handle a update with a state that does not include the page to be updated', () => {
      const payload = {
        id: 'JaenPage foo-bar-baz-3',
        slug: 'updated-slug'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is one bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length + 1
      )

      // Expect the slug to be updated
      expect(result['JaenPage foo-bar-baz-3'].slug).toBe(payload.slug)
    })
    test('should handle a page move to a new parent (state includes page, old parent and new parent)', () => {
      const payload = {
        id: 'JaenPage foo-bar-baz-2-1',
        parent: {id: 'JaenPage foo-bar-baz-1'},
        fromId: 'JaenPage foo-bar-baz-2'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is not bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length
      )

      // Expect the parent to be updated
      expect(result['JaenPage foo-bar-baz-1'].children).toEqual(
        expect.arrayContaining([expect.objectContaining({id: payload.id})])
      )

      // Expect the old parent to be updated
      expect(result['JaenPage foo-bar-baz-2'].children).toEqual(
        expect.arrayContaining([
          expect.objectContaining({id: payload.id, deleted: true})
        ])
      )

      // Expect the page to be updated
      expect(result['JaenPage foo-bar-baz-2-1'].parent?.id).toEqual(
        payload.parent.id
      )
    })
    test('should handle a page move to a new parent (state includes page, old parent)', () => {
      const payload = {
        id: 'JaenPage foo-bar-baz-2-1',
        parent: {id: 'JaenPage foo-bar-baz-new-parent'},
        fromId: 'JaenPage foo-bar-baz-2'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is one bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length + 1
      )

      // Expect the parent to be updated
      expect(result['JaenPage foo-bar-baz-new-parent'].children).toEqual(
        expect.arrayContaining([expect.objectContaining({id: payload.id})])
      )

      // Expect the old parent to be updated
      expect(result['JaenPage foo-bar-baz-2'].children).toEqual(
        expect.arrayContaining([
          expect.objectContaining({id: payload.id, deleted: true})
        ])
      )

      // Expect the page to be updated
      expect(result['JaenPage foo-bar-baz-2-1'].parent?.id).toEqual(
        payload.parent.id
      )
    })
    test('should handle a page move to a new parent (state includes page)', () => {
      const payload = {
        id: 'JaenPage foo-bar-baz-2-1',
        parent: {id: 'JaenPage foo-bar-baz-new-parent'},
        fromId: 'JaenPage foo-bar-baz-old-parent'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is two bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length + 2
      )

      // Find parentPage and oldParentPage in the result
      const parentPage = result[payload.parent.id]
      const oldParentPage = result[payload.fromId]

      // Expect the parent to be defined
      expect(parentPage).toBeDefined()
      // Expect the old parent to be defined
      expect(oldParentPage).toBeDefined()

      if (parentPage && oldParentPage) {
        // Expect the parent to be updated

        expect(parentPage.children).toEqual(
          expect.arrayContaining([expect.objectContaining({id: payload.id})])
        )

        // Expect the old parent to be updated
        expect(oldParentPage.children).toEqual(
          expect.arrayContaining([
            expect.objectContaining({id: payload.id, deleted: true})
          ])
        )
      }

      // Expect the page to be updated
      expect(result['JaenPage foo-bar-baz-2-1'].parent?.id).toEqual(
        payload.parent.id
      )
    })
    test('should handle a page move to a new parent', () => {
      const payload = {
        id: 'JaenPage foo-bar-baz-new-page',
        parent: {id: 'JaenPage foo-bar-baz-new-parent'},
        fromId: 'JaenPage foo-bar-baz-old-parent'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is three bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length + 3
      )

      // Find page,  parentPage and oldParentPage in the result
      const page = result[payload.id]
      const parentPage = result[payload.parent.id]
      const oldParentPage = result[payload.fromId]

      // Expect the page to be defined
      expect(page).toBeDefined()
      // Expect the parent to be defined
      expect(parentPage).toBeDefined()
      // Expect the old parent to be defined
      expect(oldParentPage).toBeDefined()

      if (page && parentPage && oldParentPage) {
        // Expect the parent to be updated
        expect(parentPage.children).toEqual(
          expect.arrayContaining([expect.objectContaining({id: payload.id})])
        )

        // Expect the old parent to be updated
        expect(oldParentPage.children).toEqual(
          expect.arrayContaining([
            expect.objectContaining({id: payload.id, deleted: true})
          ])
        )

        // Expect the page to be updated
        expect(page.parent?.id).toEqual(payload.parent.id)
      }
    })
    test('should handle a page move to null parent', () => {
      const payload = {
        id: 'JaenPage foo-bar-baz-new-page',
        parent: null,
        fromId: 'JaenPage foo-bar-baz-old-parent'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.page_updateOrCreate(payload)
      )

      // Expect that the result is three bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length + 2
      )

      // Find page,  parentPage and oldParentPage in the result
      const page = result[payload.id]
      const oldParentPage = result[payload.fromId]

      expect(page?.parent).toBe(null)
      // Expect the old parent to be defined
      expect(oldParentPage).toBeDefined()
    })
    test('should throw error on page move while creating', () => {
      const payload = {
        parent: {id: 'JaenPage foo-bar-baz-new-parent'},
        fromId: 'JaenPage foo-bar-baz-old-parent'
      }

      expect(() =>
        reducer(previousState, actions.page_updateOrCreate(payload))
      ).toThrow('Cannot move a page that is being created.')
    })
  })

  describe('page_markForDeletion', () => {
    test('should delete a page (state includes page)', () => {
      const payload = 'JaenPage foo-bar-baz-1'
      const {nodes: result} = reducer(
        previousState,
        actions.page_markForDeletion(payload)
      )

      // Expect the result length to be the same as the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length
      )

      // Expect the page to be marked as deleted
      expect(result[payload].deleted).toBe(true)
    })
    test('should delete a page (state does not include page)', () => {
      const payload = 'JaenPage foo-bar-baz-marked-as-deleted'
      const {nodes: result} = reducer(
        previousState,
        actions.page_markForDeletion(payload)
      )

      // Expect the result length to be one one bigger than the previous state
      expect(Object.keys(result).length).toBe(
        Object.keys(previousState.nodes).length + 1
      )

      // Find the page in the result
      const page = result[payload]

      // Expect the page to be defined
      expect(page).toBeDefined()

      if (page) {
        // Expect the page to be marked as deleted
        expect(page.deleted).toBe(true)
      }
    })
  })

  describe('section_add', () => {
    test('should add a section as first chapter element', () => {
      const payload = {
        pageId: 'JaenPage foo-bar-baz-1',
        chapterName: 'Chapter1',
        sectionName: 'AboutSection',
        between: [
          null,
          {
            id: 'JaenSection foo-bar-baz-1',
            ptrNext: 'JaenSection foo-bar-baz-2',
            ptrPrev: null
          }
        ]
      }

      const {nodes: result} = reducer(
        previousState,
        actions.section_add(payload as any)
      )

      // Expect
      const page = result[payload.pageId]

      const prevNodes = previousState.nodes[payload.pageId].chapters![
        payload.chapterName
      ]!.sections
      const sections = page!.chapters![payload.chapterName]!.sections

      //> Conditions
      // Expect the chapter to be of length prevChapter length + 1
      expect(Object.keys(sections).length).toBe(
        Object.keys(prevNodes).length + 1
      )

      // get the section of chapter that was added to the object
      const sectionKey = Object.keys(sections)[Object.keys(sections).length - 1]

      // Expect the pointers to be correct
      const p1 = sections['JaenSection foo-bar-baz-1']
      expect({ptrPrev: p1.ptrPrev, ptrNext: p1.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: sectionKey,
          ptrNext: 'JaenSection foo-bar-baz-2'
        })
      )

      const p2 = sections[sectionKey]
      expect({ptrPrev: p2.ptrPrev, ptrNext: p2.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: null,
          ptrNext: 'JaenSection foo-bar-baz-1'
        })
      )

      // Expect that the head pointer is correct
      expect(page!.chapters![payload.chapterName]!.ptrHead).toEqual(sectionKey)
    })
    test('should add a section as last chapter element', () => {
      const payload = {
        pageId: 'JaenPage foo-bar-baz-1',
        chapterName: 'Chapter1',
        sectionName: 'AboutSection',
        between: [
          {
            id: 'JaenSection foo-bar-baz-2',
            ptrNext: null,
            ptrPrev: 'JaenSection foo-bar-baz-1'
          },
          null
        ]
      }

      const {nodes: result} = reducer(
        previousState,
        actions.section_add(payload as any)
      )

      // Expect
      const page = result[payload.pageId]

      const prevNodes = previousState.nodes[payload.pageId].chapters![
        payload.chapterName
      ]!.sections
      const sections = page!.chapters![payload.chapterName]!.sections

      //> Conditions
      // Expect the chapter to be of length prevChapter length + 1
      expect(Object.keys(sections).length).toBe(
        Object.keys(prevNodes).length + 1
      )

      // get the section of chapter that was added to the object
      const sectionKey = Object.keys(sections)[Object.keys(sections).length - 1]

      // Expect the pointers to be correct
      // prev last section ("JaenSection foo-bar-baz-2") -> ptrPrev: "JaenSection foo-bar-baz-1"; ptrNext: newSectionId;

      const p1 = sections['JaenSection foo-bar-baz-2']
      expect({ptrPrev: p1.ptrPrev, ptrNext: p1.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: 'JaenSection foo-bar-baz-1',
          ptrNext: sectionKey
        })
      )

      const p2 = sections[sectionKey]
      expect({ptrPrev: p2.ptrPrev, ptrNext: p2.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: 'JaenSection foo-bar-baz-2',
          ptrNext: null
        })
      )

      // Expect that the tail pointer is correct
      expect(page!.chapters![payload.chapterName]!.ptrTail).toEqual(sectionKey)
    })
    test('should add a section between two sections', () => {
      const payload = {
        pageId: 'JaenPage foo-bar-baz-1',
        chapterName: 'Chapter1',
        sectionName: 'AboutSection',
        between: [
          {
            id: 'JaenSection foo-bar-baz-1',
            ptrNext: 'JaenSection foo-bar-baz-2',
            ptrPrev: null
          },
          {
            id: 'JaenSection foo-bar-baz-2',
            ptrNext: null,
            ptrPrev: 'JaenSection foo-bar-baz-1'
          }
        ]
      }

      const {nodes: result} = reducer(
        previousState,
        actions.section_add(payload as any)
      )

      // Expect
      const page = result[payload.pageId]

      const prevNodes = previousState.nodes[payload.pageId].chapters![
        payload.chapterName
      ]!.sections
      const sections = page!.chapters![payload.chapterName]!.sections

      //> Conditions
      // Expect the chapter to be of length prevChapter length + 1
      expect(Object.keys(sections).length).toBe(
        Object.keys(prevNodes).length + 1
      )

      // get the section of chapter that was added to the object
      const sectionKey = Object.keys(sections)[Object.keys(sections).length - 1]

      // Expect the pointers to be correct

      const p1 = sections['JaenSection foo-bar-baz-1']
      expect({ptrPrev: p1.ptrPrev, ptrNext: p1.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: null,
          ptrNext: sectionKey
        })
      )

      const p2 = sections[sectionKey]
      expect({ptrPrev: p2.ptrPrev, ptrNext: p2.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: 'JaenSection foo-bar-baz-1',
          ptrNext: 'JaenSection foo-bar-baz-2'
        })
      )

      const p3 = sections['JaenSection foo-bar-baz-2']
      expect({ptrPrev: p3.ptrPrev, ptrNext: p3.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: sectionKey,
          ptrNext: null
        })
      )
    })
    test('should add a section with a empty state', () => {
      const payload = {
        pageId: 'JaenPage foo-bar-baz-1',
        chapterName: 'Chapter1',
        sectionName: 'AboutSection',
        between: [
          {
            id: 'JaenSection foo-bar-baz-1',
            ptrNext: 'JaenSection foo-bar-baz-2',
            ptrPrev: null
          },
          {
            id: 'JaenSection foo-bar-baz-2',
            ptrNext: null,
            ptrPrev: 'JaenSection foo-bar-baz-1'
          }
        ]
      }

      const {nodes: result} = reducer(
        initialState.pages,
        actions.section_add(payload as any)
      )

      // Expect three sections to be added
      const page = result[payload.pageId]

      expect(
        Object.keys(page?.chapters?.[payload.chapterName]!.sections || {})
          .length
      ).toBe(3)
    })
  })

  describe('seciton_remove', () => {
    test('should remove a section between (null, section)', () => {
      const payload: any = {
        pageId: 'JaenPage foo-bar-baz-1',
        chapterName: 'Chapter1',
        sectionId: 'JaenSection foo-bar-baz-1',
        between: [
          null,
          {
            id: 'JaenSection foo-bar-baz-2',
            ptrNext: null,
            ptrPrev: 'JaenSection foo-bar-baz-1'
          }
        ]
      }

      const {nodes: result} = reducer(
        previousState,
        actions.section_remove(payload)
      )

      // Expect the section to be marked as deleted
      const page = result[payload.pageId]
      const section = page!.chapters![payload.chapterName]!.sections[
        payload.sectionId
      ]

      expect(section.deleted).toBe(true)

      // Expect the pointers to be correct
      // - between[1]: ptrNext: null; ptrPrev: null

      const p1 = page!.chapters![payload.chapterName]!.sections[
        payload.between[1].id
      ]

      expect({ptrPrev: p1.ptrPrev, ptrNext: p1.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: null,
          ptrNext: null
        })
      )

      // Expect the head and tail pointer to be correct
      expect(page!.chapters![payload.chapterName]!.ptrHead).toEqual(
        payload.between[1].id
      )

      expect(page!.chapters![payload.chapterName]!.ptrTail).toEqual(
        payload.between[1].id
      )
    })
    test('should remove a section between (section, null)', () => {
      const payload: any = {
        pageId: 'JaenPage foo-bar-baz-1',
        chapterName: 'Chapter1',
        sectionId: 'JaenSection foo-bar-baz-2',
        between: [
          {
            id: 'JaenSection foo-bar-baz-1',
            ptrNext: 'JaenSection foo-bar-baz-2',
            ptrPrev: null
          },
          null
        ]
      }

      const {nodes: result} = reducer(
        previousState,
        actions.section_remove(payload)
      )

      // Expect the section to be marked as deleted
      const page = result[payload.pageId]
      const section = page!.chapters![payload.chapterName]!.sections[
        payload.sectionId
      ]

      expect(section.deleted).toBe(true)

      // Expect the pointers to be correct
      // - between[0]: ptrNext: null; ptrPrev: null

      const p1 = page!.chapters![payload.chapterName]!.sections[
        payload.between[0].id
      ]

      expect({ptrPrev: p1.ptrPrev, ptrNext: p1.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: null,
          ptrNext: null
        })
      )

      // Expect the head and tail pointer to be correct
      expect(page!.chapters![payload.chapterName]!.ptrHead).toEqual(
        payload.between[0].id
      )

      expect(page!.chapters![payload.chapterName]!.ptrTail).toEqual(
        payload.between[0].id
      )
    })
    test('should remove a section between (section, section)', () => {
      const payload: any = {
        pageId: 'JaenPage foo-bar-baz-1',
        chapterName: 'Chapter2',
        sectionId: 'JaenSection foo-bar-baz-4',
        between: [
          {
            id: 'JaenSection foo-bar-baz-3',
            ptrNext: 'JaenSection foo-bar-baz-4',
            ptrPrev: null
          },
          {
            id: 'JaenSection foo-bar-baz-5',
            ptrNext: null,
            ptrPrev: 'JaenSection foo-bar-baz-4'
          }
        ]
      }

      const {nodes: result} = reducer(
        previousState,
        actions.section_remove(payload)
      )

      // Expect the section to be marked as deleted
      const page = result[payload.pageId]
      const section = page!.chapters![payload.chapterName]!.sections[
        payload.sectionId
      ]

      expect(section.deleted).toBe(true)

      // Expect the pointers to be correct
      // - between[0]: ptrNext: "JaenSection foo-bar-baz-5"; ptrPrev: null
      // - between[1]: ptrNext: null; ptrPrev: "JaenSection foo-bar-baz-5"

      const p1 = page!.chapters![payload.chapterName]!.sections[
        payload.between[0].id
      ]

      expect({ptrPrev: p1.ptrPrev, ptrNext: p1.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: null,
          ptrNext: payload.between[1].id
        })
      )

      const p2 = page!.chapters![payload.chapterName]!.sections[
        payload.between[1].id
      ]

      expect({ptrPrev: p2.ptrPrev, ptrNext: p2.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: payload.between[0].id,
          ptrNext: null
        })
      )

      // Expect the head and tail pointer to be correct
      expect(page!.chapters![payload.chapterName]!.ptrHead).toEqual(
        payload.between[0].id
      )

      expect(page!.chapters![payload.chapterName]!.ptrTail).toEqual(
        payload.between[1].id
      )
    })
    test('should remove a section between (section, section) with empty state', () => {
      const payload: any = {
        pageId: 'JaenPage foo-bar-baz-1',
        chapterName: 'Chapter2',
        sectionId: 'JaenSection foo-bar-baz-4',
        between: [
          {
            id: 'JaenSection foo-bar-baz-3',
            ptrNext: 'JaenSection foo-bar-baz-4',
            ptrPrev: null
          },
          {
            id: 'JaenSection foo-bar-baz-5',
            ptrNext: null,
            ptrPrev: 'JaenSection foo-bar-baz-4'
          }
        ]
      }

      const {nodes: result} = reducer(
        initialState.pages,
        actions.section_remove(payload)
      )

      // Expect the section to be marked as deleted
      const page = result[payload.pageId]
      const section = page!.chapters![payload.chapterName]!.sections[
        payload.sectionId
      ]

      expect(section.deleted).toBe(true)

      // Expect the pointers to be correct
      // - between[0]: ptrNext: "JaenSection foo-bar-baz-5"; ptrPrev: null
      // - between[1]: ptrNext: null; ptrPrev: "JaenSection foo-bar-baz-5"

      const p1 = page!.chapters![payload.chapterName]!.sections[
        payload.between[0].id
      ]

      expect({ptrPrev: p1.ptrPrev, ptrNext: p1.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: null,
          ptrNext: payload.between[1].id
        })
      )

      const p2 = page!.chapters![payload.chapterName]!.sections[
        payload.between[1].id
      ]

      expect({ptrPrev: p2.ptrPrev, ptrNext: p2.ptrNext}).toEqual(
        expect.objectContaining({
          ptrPrev: payload.between[0].id,
          ptrNext: null
        })
      )

      // Expect the head and tail pointer to be correct
      expect(page!.chapters![payload.chapterName]!.ptrHead).toEqual(undefined)

      expect(page!.chapters![payload.chapterName]!.ptrTail).toEqual(undefined)
    })
  })

  describe('field_write', () => {
    test('should add a field to a page', () => {
      const payload = {
        pageId: 'JaenPage foo-bar-baz-1',
        fieldType: 'text',
        fieldName: 'foo',
        value: 'bar'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.field_write(payload)
      )

      // Expect the field to be added to the page
      const page = result[payload.pageId]
      expect(page!.jaenFields).toEqual(
        expect.objectContaining({
          [payload.fieldType]: {
            [payload.fieldName]: payload.value
          }
        })
      )
    })
    test('should add a field to a page section', () => {
      const payload = {
        pageId: 'JaenPage foo-bar-baz-1',
        section: {
          chapterName: 'Chapter1',
          sectionId: 'JaenSection foo-bar-baz-1'
        },
        fieldType: 'text',
        fieldName: 'foo',
        value: 'bar'
      }

      const {nodes: result} = reducer(
        previousState,
        actions.field_write(payload)
      )

      // Expect the field to be added to the page
      const page = result[payload.pageId]
      expect(
        page!.chapters![payload.section.chapterName]!.sections[
          payload.section.sectionId
        ]!.jaenFields
      ).toEqual(
        expect.objectContaining({
          [payload.fieldType]: {
            [payload.fieldName]: payload.value
          }
        })
      )
    })
  })
})

describe('routing', () => {
  const reducer = reducers.routing
  const previousState = state.routing

  describe('updateDynamicPaths', () => {
    test('should handle dynamic path generation for a pageId', () => {
      const action = actions.updateDynamicPaths({
        jaenPageTree: [
          {
            id: '1',
            slug: 'root',
            children: [
              {
                id: '2'
              }
            ],
            parent: null,
            jaenPageMetadata: {
              title: 'Root'
            },
            template: null
          },
          {
            id: '2',
            slug: 'contact',
            children: [
              {
                id: '3'
              }
            ],
            parent: {id: '1'},
            jaenPageMetadata: {
              title: 'Root'
            },
            template: null
          },
          {
            id: '3',
            slug: 'subcontact',
            children: [],
            parent: {id: '2'},
            jaenPageMetadata: {
              title: 'Root'
            },
            template: null
          }
        ],
        pageId: '3',
        create: true
      })

      const newState = reducer(previousState, action)

      expect(newState.dynamicPaths).toEqual({
        '/root/contact/subcontact': {
          pageId: '3',
          templateName: null
        }
      })
    })
  })
})
