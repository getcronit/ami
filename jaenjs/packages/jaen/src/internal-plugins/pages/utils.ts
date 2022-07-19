import deepmerge from 'deepmerge'
import {v4 as uuidv4} from 'uuid'
import {IJaenSection, IJaenSectionItem, JaenSectionPath} from './types'

export const updateItem = <T>(
  items: IJaenSectionItem[],
  id: string,
  newData: Partial<T>
) => {
  const index = items.findIndex(item => item.id === id)

  if (index === -1) {
    // @ts-ignore
    items.push({
      id,
      ...newData
    })
  } else {
    items[index] = deepmerge(items[index], newData)
  }

  return items
}

export const insertSectionIntoTree = (
  sections: IJaenSection[],
  path: JaenSectionPath,
  options?: {
    between?: [string | null, string | null]
    sectionId?: string
    shouldDelete?: true
    sectionItemData?: Partial<IJaenSectionItem>
  }
): IJaenSection | null => {
  const between = options?.between
  const sectionId = options?.sectionId
  const shouldDelete = options?.shouldDelete
  const sectionItemData = options?.sectionItemData || {}

  const [head, ...tail] = path

  if (!sections.find(({fieldName}) => fieldName === head.fieldName)) {
    sections.push({
      fieldName: head.fieldName,
      // @ts-ignore
      ptrHead: undefined,
      // @ts-ignore
      ptrTail: undefined,
      items: []
    })
  }

  console.log(sections)

  for (const section of sections) {
    if (section.fieldName === head.fieldName) {
      if (tail.length === 0) {
        if (sectionId && shouldDelete) {
          updateItem(section.items, sectionId, {
            ...sectionItemData,
            deleted: true
          })

          if (between) {
            const [prev, next] = between

            if (prev && !next) {
              // If next is not defined:
              // - set the prev section's next pointer to null
              // - set the tail pointer to the prev section's id

              updateItem(section.items, prev, {
                ptrNext: null
              })

              section.ptrTail = prev
            } else if (!prev && next) {
              // If prev is not defined:
              // - set the next section's prev pointer to null
              // - set the head pointer to the next section's id

              updateItem(section.items, next, {
                ptrPrev: null
              })

              section.ptrHead = next
            } else if (prev && next) {
              // If both prev and next are defined:
              // - set the prev section's next pointer to the next section's id
              // - set the next section's prev pointer to the prev section's id

              updateItem(section.items, prev, {
                ptrNext: null
              })
              updateItem(section.items, next, {
                ptrPrev: null
              })
            } else {
              // If both prev and next are not defined:
              // - set the head and tail pointers to null

              section.ptrHead = null
              section.ptrTail = null
            }
          }
        } else {
          // Generate a new id in the pattern of `JaenSection {uuid}`
          const genSectionId = sectionId || `JaenSection ${uuidv4()}`

          if (between && sectionItemData.type) {
            const [prev, next] = between

            if (!prev && !next) {
              // If the before and after are not defined, add the section without changing
              // the pointers of other sections

              section.items.push({
                id: genSectionId,
                jaenFields: null,
                jaenFiles: [],
                ptrNext: null,
                ptrPrev: null,
                sections: [],
                type: sectionItemData.type,
                ...sectionItemData
              })

              section.ptrHead = genSectionId
              section.ptrTail = genSectionId
            } else if (prev && !next) {
              // If the after is defined, add the section before the after

              section.items.push({
                id: genSectionId,
                jaenFields: null,
                jaenFiles: [],
                ptrNext: null,
                ptrPrev: prev,
                sections: [],
                type: sectionItemData.type,
                ...sectionItemData
              })

              updateItem(section.items, prev, {
                ptrNext: genSectionId
              })

              section.ptrTail = genSectionId
            } else if (!prev && next) {
              // If the before is defined, add the section after the before

              section.items.push({
                id: genSectionId,
                jaenFields: null,
                jaenFiles: [],
                ptrNext: next,
                ptrPrev: null,
                sections: [],
                type: sectionItemData.type,
                ...sectionItemData
              })

              updateItem(section.items, next, {
                ptrPrev: genSectionId
              })

              section.ptrHead = genSectionId
            } else if (prev && next) {
              // cannot use else here because of the null check
              // If both before and after are defined, add the section between the before and after

              section.items.push({
                id: genSectionId,
                jaenFields: null,
                jaenFiles: [],
                ptrNext: next,
                ptrPrev: prev,
                sections: [],
                type: sectionItemData.type,
                ...sectionItemData
              })

              updateItem(section.items, prev, {
                ptrNext: genSectionId
              })

              updateItem(section.items, next, {
                ptrPrev: genSectionId
              })
            }
          } else {
            updateItem(section.items, genSectionId, {
              ...sectionItemData,
              id: genSectionId
            })
          }
        }

        return section
      }

      let item = section.items.find(({id}) => id === tail[0]?.sectionId)
      console.log(item)

      if (!item) {
        item = {
          id: tail[0]?.sectionId
        } as IJaenSectionItem

        section.items.push(item)
      }

      item.sections = item.sections || []

      return insertSectionIntoTree(item.sections, tail, options)
    }
  }

  return null
}

export const findSection = (
  sections: IJaenSection[],
  path: JaenSectionPath
): IJaenSection | null => {
  const [head, ...tail] = path

  for (const section of sections) {
    if (section.fieldName === head.fieldName) {
      if (tail.length === 0) {
        return section
      }

      for (const item of section.items) {
        if (item.id === tail[0].sectionId) {
          if (item.sections) {
            return findSection(item.sections, tail)
          }
        }
      }
    }
  }

  return null
}
