import {loadPaths, validatePaths, loadModule} from './loader.js'

const loadModules = async (absoluteFolderPath: string) => {
  const files = await loadPaths(absoluteFolderPath)
  const {validPaths} = validatePaths(files, ['ts', 'js'])
  const modules = []

  for (const file of validPaths) {
    const module = await loadModule(file)
    if (module) {
      modules.push(module)
    }
  }

  return modules
}

export default loadModules
