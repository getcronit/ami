import fs from 'fs'
import path from 'path'
import {importFresh} from '../../utils.js'

export const loadPaths = async (absolutePath: string): Promise<string[]> => {
  try {
    const files = await fs.promises.readdir(absolutePath)

    return files.map(file => path.resolve(absolutePath, file))
  } catch (err) {
    console.warn(`Can't read directory ${absolutePath}`, err)
    return []
  }
}

export const validatePaths = (
  paths: string[],
  allowedExtensions: string[]
): {
  invalidPaths: string[]
  validPaths: string[]
} => {
  const validPaths: string[] = []
  const invalidPaths: string[] = []

  paths.forEach(path => {
    const extension = path.split('.').pop()

    if (!extension || !allowedExtensions.includes(extension)) {
      invalidPaths.push(path)
    } else {
      validPaths.push(path)
    }
  })

  return {
    invalidPaths,
    validPaths
  }
}

export const loadModule = async (absolutePath: string): Promise<any | null> => {
  try {
    return await importFresh(absolutePath)
  } catch (err) {
    console.warn(`Can't load module ${absolutePath}`, err)

    return null
  }
}
