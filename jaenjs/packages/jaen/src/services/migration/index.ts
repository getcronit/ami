import deepmerge from 'deepmerge'
import update from 'immutability-helper'
import fetch from 'node-fetch'
import {nodejsSafeJsonUpload} from '../openStorageGateway'
import {
  IBaseEntity,
  IMigrationEntity,
  IMigrationURLData,
  IRemoteFileMigration
} from './types'
export const JAEN_STATIC_DATA_DIR = './jaen-data'

export const downloadMigrationURL = async (
  url: string
): Promise<IMigrationURLData> => await (await fetch(url)).json()

export const downloadMigrationContext = async (
  entity: IMigrationEntity
): Promise<object> => await (await fetch(entity.context.fileUrl)).json()

export const downloadBaseContext = async (entity: IBaseEntity): Promise<any> =>
  await (await fetch(entity.context.fileUrl)).json()

const uploadMigration = async (data: object): Promise<IRemoteFileMigration> => {
  const fileUrl = await nodejsSafeJsonUpload(JSON.stringify(data))

  const newMigration = {
    createdAt: new Date().toISOString(),
    fileUrl
  }

  return newMigration
}

export const updateEntity = async (
  baseEntity: IBaseEntity | undefined,
  migrationData: object
) => {
  // check if baseEntity is not a empty object

  if (!baseEntity?.context) {
    const newMigration = await uploadMigration(migrationData)
    return {
      context: newMigration,
      migrations: [newMigration]
    }
  } else {
    const baseData = await downloadBaseContext(baseEntity)
    // !TODO: Implement merging logic
    const mergedData = deepmerge<any>(baseData, migrationData, {
      arrayMerge: (destinationArray, sourceArray) => {
        // concat arrays of objects without duplicates by id
        const array = sourceArray
          .concat(
            destinationArray.filter(
              item => sourceArray.findIndex(n => n.id === item.id) === -1
            )
          )
          .filter(item => !item.deleted)

        return array
      }
    }) //{...baseData, ...migrationData}

    const newMigration = await uploadMigration(mergedData)

    return update(baseEntity, {
      context: {$set: newMigration},
      migrations: {$push: [newMigration]}
    })
  }
}
