import { Reporter, Store } from 'gatsby'
import {
  createRemoteFileNode,
  CreateRemoteFileNodeArgs
} from 'gatsby-source-filesystem'
import {IJaenPage} from '../../types'

export interface IProcessGatbsy {
  createNode: CreateRemoteFileNodeArgs['createNode']
  createNodeId: CreateRemoteFileNodeArgs['createNodeId']
  cache: CreateRemoteFileNodeArgs['cache']
  store: Store
  reporter: Reporter
}

export const processPage = async ({
  page,
  ...rest
}: {page: IJaenPage} & IProcessGatbsy): Promise<void> => {
  // process jaenFields of page if not null
  if (page.jaenFields) {
    for (const [type, field] of Object.entries(page.jaenFields)) {
      await processIMAtoNodes({
        page,
        type,
        field,
        ...rest
      })
    }
  }

  // process jaenFields of chapter if not null
  if (page.chapters) {
    for (const chapter of Object.values(page.chapters)) {
      for (const section of Object.values(chapter.sections)) {
        if (section.jaenFields) {
          for (const [type, field] of Object.entries(section.jaenFields)) {
            await processIMAtoNodes({
              page,
              type,
              field,
              ...rest
            })
          }
        }
      }
    }
  }

  // @ts-ignore
  page.jaenFiles = page.jaenFiles || []
}

export interface IProcessIMAtoNodes extends IProcessGatbsy {
  page: IJaenPage
  type: string
  field: NonNullable<IJaenPage['jaenFields']>['string']
}

export const processIMAtoNodes = async ({
  page,
  type,
  field,
  ...rest
}: IProcessIMAtoNodes): Promise<void> => {
  switch (type) {
    case 'IMA:ImageField':
      for (const [name, value] of Object.entries(field)) {
        try {
          const {internalImageUrl} = value as {internalImageUrl: string}

          if (internalImageUrl) {
            let fileNode = await createRemoteFileNode({
              url: internalImageUrl,
              parentNodeId: page.id,
              ...rest
            })

            const fileNodeId = fileNode.id

            value.imageId = fileNode.id

            if (!page.jaenFiles) {
              page.jaenFiles = []
            }

            // @ts-ignore
            page.jaenFiles.push({
              // @ts-ignore
              file___NODE: fileNodeId
            })
          }
        } catch (error) {
          console.error(`${name} is not a valid IMA field`)
        }
      }

    default:
      break
  }
}
