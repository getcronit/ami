import {IJaenState} from '../../types'
import {actions, initialState, reducers} from '../internal'

const state: IJaenState = {
  status: {
    isEditing: false
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
        sections: [
          {
            fieldName: 'Chapter1',
            items: [
              {
                id: 'JaenSectionItem foo-bar-baz-1',
                type: 'JaenSectionItem',
                ptrPrev: null,
                ptrNext: null,
                jaenFields: null,
                jaenFiles: [],
                sections: []
              }
            ],
            ptrHead: 'JaenSection foo-bar-baz-1',
            ptrTail: 'JaenSection foo-bar-baz-2'
          }
        ]
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
    },
    registeredPageFields: {}
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
    test('should add a SectionItem as first item', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.section_add({
          pageId: 'JaenPage foo-bar-baz-1',
          path: [
            {
              fieldName: 'testestest'
            }
          ],
          sectionItemType: 'TestItem',
          between: [null, 'JaenSection foo-bar-baz-1-1']
        })
      )

      // Get page from result
      const sections = result['JaenPage foo-bar-baz-1'].sections

      expect(sections).toBeDefined()
      expect(sections?.length).toBe(2)

      const section = sections?.[1]

      expect(section).toBeDefined()

      if (section) {
        expect(section.fieldName).toBe('testestest')
        expect(section.items?.length).toBe(2)

        const lastSectionItemId = section.items?.[0].id

        expect(section.ptrHead).toBe(lastSectionItemId)
        expect(section.ptrTail).toBeUndefined()
      }
    })
    test('should add a SectionItem as last item', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.section_add({
          pageId: 'JaenPage foo-bar-baz-1',
          path: [
            {
              fieldName: 'testestest'
            }
          ],
          sectionItemType: 'TestItem',
          between: ['JaenSection foo-bar-baz-1-1', null]
        })
      )

      // Get page from result
      const sections = result['JaenPage foo-bar-baz-1'].sections

      expect(sections).toBeDefined()
      expect(sections?.length).toBe(2)

      const section = sections?.[1]

      expect(section).toBeDefined()

      if (section) {
        expect(section.fieldName).toBe('testestest')
        expect(section.items?.length).toBe(2)

        const lastSectionItemId = section.items?.[0].id

        expect(section.ptrHead).toBeUndefined()
        expect(section.ptrTail).toBe(lastSectionItemId)
      }
    })
    test('should add a SectionItem between two items', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.section_add({
          pageId: 'JaenPage foo-bar-baz-1',
          path: [
            {
              fieldName: 'testestest'
            }
          ],
          sectionItemType: 'TestItem',
          between: [
            'JaenSection foo-bar-baz-1-1',
            'JaenSection foo-bar-baz-1-2'
          ]
        })
      )

      // Get page from result
      const sections = result['JaenPage foo-bar-baz-1'].sections

      expect(sections).toBeDefined()
      expect(sections?.length).toBe(2)

      const section = sections?.[1]

      expect(section).toBeDefined()

      if (section) {
        expect(section.fieldName).toBe('testestest')
        expect(section.items?.length).toBe(3)

        expect(section.ptrHead).toBeUndefined()
        expect(section.ptrTail).toBeUndefined()
      }
    })
  })

  describe('seciton_remove', () => {
    test('should remove a section between (null, section)', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.section_remove({
          pageId: 'JaenPage foo-bar-baz-1',
          path: [
            {
              fieldName: 'testestest'
            }
          ],
          sectionId: 'JaenSection foo-bar-baz-1-1',
          between: [null, 'JaenSection foo-bar-baz-1-2']
        })
      )

      // Get page from result
      const sections = result['JaenPage foo-bar-baz-1'].sections

      expect(sections).toBeDefined()

      expect(sections?.length).toBe(2)

      const section = sections?.[1]

      expect(section).toBeDefined()

      if (section) {
        expect(section.fieldName).toBe('testestest')
        expect(section.items?.length).toBe(2)

        const [firstSectionItem, secondSectionItem] = section.items

        expect(section.ptrHead).toBe(secondSectionItem.id)
        expect(section.ptrTail).toBeUndefined()

        expect(firstSectionItem.deleted).toBe(true)
        expect(secondSectionItem.ptrPrev).toBe(null)
      }
    })
    test('should remove a section between (section, null)', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.section_remove({
          pageId: 'JaenPage foo-bar-baz-1',
          path: [
            {
              fieldName: 'testestest'
            }
          ],
          sectionId: 'JaenSection foo-bar-baz-1-2',
          between: ['JaenSection foo-bar-baz-1-1', null]
        })
      )

      // Get page from result
      const sections = result['JaenPage foo-bar-baz-1'].sections

      expect(sections).toBeDefined()

      expect(sections?.length).toBe(2)

      const section = sections?.[1]

      expect(section).toBeDefined()

      if (section) {
        expect(section.fieldName).toBe('testestest')
        expect(section.items?.length).toBe(2)

        const [firstSectionItem, secondSectionItem] = section.items

        expect(section.ptrHead).toBeUndefined()
        expect(section.ptrTail).toBe(secondSectionItem.id)

        expect(secondSectionItem.ptrNext).toBe(null)
        expect(firstSectionItem.deleted).toBe(true)
      }
    })
    test('should remove a section between (section, section)', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.section_remove({
          pageId: 'JaenPage foo-bar-baz-1',
          path: [
            {
              fieldName: 'testestest'
            }
          ],
          sectionId: 'JaenSection foo-bar-baz-1-2',
          between: [
            'JaenSection foo-bar-baz-1-1',
            'JaenSection foo-bar-baz-1-2'
          ]
        })
      )

      // Get page from result
      const sections = result['JaenPage foo-bar-baz-1'].sections

      expect(sections).toBeDefined()

      expect(sections?.length).toBe(2)

      const section = sections?.[1]

      expect(section).toBeDefined()

      if (section) {
        expect(section.fieldName).toBe('testestest')
        expect(section.items?.length).toBe(2)

        const [firstSectionItem, secondSectionItem] = section.items

        expect(section.ptrHead).toBeUndefined()
        expect(section.ptrTail).toBeUndefined()

        expect(firstSectionItem.deleted).toBe(true)
        expect(secondSectionItem.ptrNext).toBe(null)
      }
    })
  })

  describe('field_write', () => {
    test('should add a field to a page', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.field_write({
          pageId: 'JaenPage foo-bar-baz-1',
          fieldName: 'firstName',
          fieldType: 'IMA:TextField',
          value: 'New Value'
        })
      )

      // Get page from result
      const page = result['JaenPage foo-bar-baz-1']

      expect(page).toBeDefined()

      if (page) {
        const field = page.jaenFields?.['IMA:TextField']

        expect(field).toBeDefined()

        if (field) {
          expect(field['firstName']).toBe('New Value')
        }
      }
    })
    test('should add a field to a page section', () => {
      const {nodes: result} = reducer(
        previousState,
        actions.field_write({
          pageId: 'JaenPage foo-bar-baz-1',
          fieldName: 'firstName',
          fieldType: 'IMA:TextField',
          value: 'New Value',
          section: {
            path: [
              {
                fieldName: 'testestest'
              }
            ],
            id: 'JaenSection foo-bar-baz-1-1'
          }
        })
      )

      // Get page from result
      const sections = result['JaenPage foo-bar-baz-1'].sections

      expect(sections).toBeDefined()

      expect(sections?.length).toBe(2)

      const section = sections?.[1]

      expect(section).toBeDefined()

      if (section) {
        const field = section.items[0].jaenFields?.['IMA:TextField']

        expect(field).toBeDefined()

        if (field) {
          expect(field['firstName']).toBe('New Value')
        }
      }
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
            template: null,
            jaenFields: {},
            componentName: 'IndexPage',
            jaenFiles: [],
            sections: []
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
            template: null,
            jaenFields: {},
            componentName: 'IndexPage',
            jaenFiles: [],
            sections: []
          },
          {
            id: '3',
            slug: 'subcontact',
            children: [],
            parent: {id: '2'},
            jaenPageMetadata: {
              title: 'Root'
            },
            template: null,
            jaenFields: {},
            componentName: 'IndexPage',
            jaenFiles: [],
            sections: []
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
