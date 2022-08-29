import path from 'path'
import {ConfigureApp} from '../../types.js'
import {loadModule, loadPaths, validatePaths} from './loader.js'

export const loadModules = async (absoluteFolderPath: string) => {
  const files = await loadPaths(absoluteFolderPath)
  const {validPaths} = validatePaths(files, ['ts', 'js'])
  const modules = []

  for (const file of validPaths) {
    const module = (await loadModule(file)).default
    if (module) {
      modules.push(module)
    }
  }

  return modules
}

export const loadAppJs = async (
  relativeFolderPath: string
): Promise<{
  configureApp: ConfigureApp
}> => {
  const absoluteFilePath = path.resolve(`${relativeFolderPath}/app.js`)
  const appJs = await loadModule(absoluteFilePath)

  if (!appJs) {
    return {
      configureApp: () => undefined
    }
  }

  console.log(appJs)

  const configureApp = appJs.configureApp || (() => undefined)

  return {
    configureApp
  }
}
