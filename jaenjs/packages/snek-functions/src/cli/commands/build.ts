import {buildFolder} from '../../fileBuilder.js'

export default async (options: {functionsPath: string}) => {
  const {functionsPath} = options

  const dstPath = `${functionsPath}/dist`

  await buildFolder(functionsPath, dstPath)
}
