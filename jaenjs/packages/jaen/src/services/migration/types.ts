export type IRemoteFileMigration = {
  createdAt: string
  fileUrl: string
}

export interface IMigrationEntity {
  context: IRemoteFileMigration
}

export interface IBaseEntity extends IMigrationEntity {
  migrations: IRemoteFileMigration[]
}

export interface IMigrationURLData {
  [pluginName: string]: any
}
