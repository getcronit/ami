import {JaenFieldsOrderEntry} from '../../types'

type Field = {
  __type: 'field'
  name: string
  type: string
  props: any
  order: number
}

type Section = {
  __type: 'section'
  id: string
  fields: FieldOrChapter[]
}

export type Chapter = {
  __type: 'chapter'
  name: string
  sections: Section[]
}

type FieldOrChapter = Field | Chapter

export const transformFields = (fields: Array<JaenFieldsOrderEntry>) => {
  const transformedFields: Array<FieldOrChapter> = []

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]

    if (field.chapter) {
      const chapterParts = field.chapter.name.split('.')

      let currentFields = transformedFields

      for (let j = 0; j < chapterParts.length; j++) {
        const chapterFullName = chapterParts.slice(0, j + 1).join('.')

        let chapter = currentFields.find(
          c => c.__type === 'chapter' && c.name === chapterFullName
        ) as Chapter

        if (!chapter) {
          chapter = {
            __type: 'chapter',
            name: chapterFullName,
            sections: []
          }

          currentFields.push(chapter)
        }

        const sectionExists = !chapter.sections.find(
          s => s.id === field.chapter?.sectionId
        )

        if (sectionExists && j === chapterParts.length - 1) {
          chapter.sections.push({
            __type: 'section',
            id: field.chapter.sectionId,
            fields: []
          })
        }

        if (j === chapterParts.length - 1) {
          chapter.sections[chapter.sections.length - 1].fields.push({
            __type: 'field',
            name: field.name,
            type: field.type,
            props: field.props,
            order: i
          })
        }

        try {
          currentFields = chapter.sections[chapter.sections.length - 1].fields
        } catch {
          throw new Error(
            `chapter '${field.chapter.name}' does not have a parent chapter '${chapterFullName}'`
          )
        }
      }
    } else {
      transformedFields.push({
        __type: 'field',
        name: field.name,
        type: field.type,
        props: field.props,
        order: i
      })
    }
  }

  return transformedFields
}
