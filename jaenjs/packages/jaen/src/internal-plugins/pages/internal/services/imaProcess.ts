import {Reporter, Store} from 'gatsby'
import {IGatsbyImageData} from 'gatsby-plugin-image'
import {
  createRemoteFileNode,
  CreateRemoteFileNodeArgs
} from 'gatsby-source-filesystem'
import {IJaenFields, IJaenPage, IJaenSection} from '../../types'

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
        node: page,
        type,
        field,
        ...rest
      })
    }
  }

  page.sections = page.sections || []

  await processSections({
    sections: page.sections,
    ...rest
  })

  // @ts-ignore
  page.jaenFiles = page.jaenFiles || []
}

export const processSections = async ({
  sections,
  ...rest
}: {sections: IJaenSection[]} & IProcessGatbsy): Promise<void> => {
  // process jaenFields of page if not null

  for (const section of sections) {
    for (const item of section.items) {
      if (item.jaenFields) {
        for (const [type, field] of Object.entries(item.jaenFields)) {
          await processIMAtoNodes({
            node: item,
            type,
            field,
            ...rest
          })
        }
      }

      item.sections = item.sections || []

      await processSections({
        sections: item.sections,
        ...rest
      })
    }
  }
}

export interface IProcessIMAtoNodes extends IProcessGatbsy {
  node: {
    id: string
    jaenFields: IJaenFields
    jaenFiles: Array<{
      id: string
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }>
  }
  type: string
  field: NonNullable<IJaenPage['jaenFields']>['string']
}

export const processIMAtoNodes = async ({
  node,
  type,
  field,
  ...rest
}: IProcessIMAtoNodes): Promise<void> => {
  switch (type) {
    case 'IMA:ImageField':
      for (const [name, v] of Object.entries(field)) {
        try {
          if (v.value) {
            const {internalImageUrl} = v.value as {internalImageUrl: string}

            if (internalImageUrl) {
              let fileNode = await createRemoteFileNode({
                url: internalImageUrl,
                parentNodeId: node.id,
                ...rest
              })

              const fileNodeId = fileNode.id

              v.value.imageId = fileNode.id

              if (!node.jaenFiles) {
                node.jaenFiles = []
              }

              // @ts-ignore
              node.jaenFiles.push(fileNodeId)
            }
          }
        } catch (error) {
          console.error(`${name} is not a valid IMA field`, error)
        }
      }

    default:
      break
  }
}
