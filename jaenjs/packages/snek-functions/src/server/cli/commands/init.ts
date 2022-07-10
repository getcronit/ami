import {initFunctionsDir} from '../../init/index.js'

export default async (options: {functionsPath: string}) => {
  await initFunctionsDir(options.functionsPath)
}
