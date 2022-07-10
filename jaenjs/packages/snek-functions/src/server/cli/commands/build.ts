import {buildFolder} from '../../fileBuilder.js'

export default async (options: {functionsPath: string}) => {
  const {functionsPath} = options

  const srcPath = `${functionsPath}/src`
  const distPath = `${functionsPath}/dist`

  await buildFolder(srcPath, distPath)
}
