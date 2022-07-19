import {IJaenPage, IJaenSection} from '../../types'

export interface IJaenState {
  status: {
    isEditing: boolean
  }
  pages: {
    lastAddedNodeId?: string
    registeredPageFields: {
      [uuid: string]: number
    }
    nodes: {
      [uuid: string]: Partial<IJaenPage>
    }
  }
  routing: {
    dynamicPaths: {
      [path: string]: {
        pageId: string
        templateName: string
      }
    }
  }
}

//> Other types

export type IJaenSectionWithId = IJaenSection & {
  id: string
}
