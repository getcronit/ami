import {PageProps} from 'gatsby'
import {IGatsbyImageData} from 'gatsby-plugin-image'
import {IBaseEntity} from '../../index'

export interface IJaenTemplate {
  name: string
  displayName: string
  children: {
    name: string
    displayName: string
  }[]
  isRootTemplate?: boolean
}

export interface IJaenPage {
  id: string
  slug: string
  jaenPageMetadata: {
    title: string
    isBlogPost?: boolean
    image?: string
    description?: string
    datePublished?: string
    canonical?: string
  }
  jaenFields: {
    [type: string]: {
      [name: string]: any
    }
  } | null
  jaenFiles: {
    file: {
      id: string
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }[]
  parent: {
    id: string
  } | null
  children: Array<{id: string} & Partial<IJaenPage>>
  chapters: {
    [chapterName: string]: {
      ptrHead: string | null
      ptrTail: string | null
      sections: {
        [uuid: string]: {
          name: string
          ptrNext: string | null
          ptrPrev: string | null
          jaenFields: {
            [type: string]: {
              [name: string]: any
            }
          } | null
          deleted?: true
        }
      }
    }
  } | null
  /**
   * Unique identifier of the page component name (e.g. `JaenPageHome`).
   * - Must be unique across all pages.
   * - Used to determine the component to render.
   */
  template: string | null
  deleted?: boolean
  excludedFromIndex?: boolean
}

export type ITreeJaenPage = Pick<
  IJaenPage,
  | 'id'
  | 'parent'
  | 'children'
  | 'slug'
  | 'jaenPageMetadata'
  | 'template'
  | 'deleted'
  | 'excludedFromIndex'
>

export type IJaenPages = {
  [uuid: string]: IJaenPage
}

export type IJaenPageProps = PageProps<
  {
    jaenPage: IJaenPage | null
    allJaenPage?: {nodes: Array<Partial<IJaenPage>>}
  },
  {jaenPageId: string}
>

export interface IPagesMigrationBase {
  [uuid: string]: IBaseEntity
}

export type IPagesMigration = {
  pages: {
    [uuid: string]: Partial<IJaenPage>
  }
}

export interface IFormProps<Values> {
  values: Values
  onSubmit: (values: Values) => void
  externalValidation?: (
    valueName: keyof Values,
    value: string
  ) => string | undefined
}
