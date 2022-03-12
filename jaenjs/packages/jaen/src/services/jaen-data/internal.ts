import {ISite} from '../../types'
import fs from 'fs'
import {IRemoteFileMigration} from '../migration/types'

export interface IJaenDataInternal {
  site: ISite
  finderUrl?: string
  migrationHistory: Array<IRemoteFileMigration>
}

const defaultData: IJaenDataInternal = {
  site: {
    siteMetadata: {}
  },
  migrationHistory: []
}

const FILE_PATH = './jaen-data/internal.json'

export function readFile(): IJaenDataInternal {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(defaultData, null, 2))
    return defaultData
  }

  return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
}

export function writeFile(data: IJaenDataInternal): void {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2))
}
