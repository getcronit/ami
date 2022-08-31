type BasicItem = {
  name: string
  createdAt: string
  modifiedAt: string
  description?: string
}

export type FinderMode = 'browser' | 'selector'

export interface FinderFolderItem extends BasicItem {
  isFolder: true
  childUUIDs: string[]
}

export interface FinderFileItem extends BasicItem {
  src: string
  previewSrc?: string
  mimeType: string
  size: string
}

export type FinderItem = FinderFolderItem | FinderFileItem

export type ResolvedFileItem = FinderFileItem & {uuid: string}
export type FinderData = {
  [UUID: string]: FinderItem
}
