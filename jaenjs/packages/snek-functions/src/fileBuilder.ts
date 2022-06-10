import {transformFile} from '@swc/core'
import fs from 'fs'
import path from 'path'
import {TEMPLATE_FILES} from './init/files.js'

export const buildFile = async (filePath: string, outputFilePath: string) => {
  const extname = path.extname(filePath)

  const {code} = await transformFile(filePath, {})

  // regex replace `import {fn} from './factory'` to `import {fn} from './factory.js'`
  const transformedCode = code
    .replaceAll(`'./factory'`, `'./factory.js'`)
    .replaceAll(`"./factory"`, `"./factory.js"`)

  let newFilePath = outputFilePath

  // change file extension to .js if it's a .ts file
  if (extname === '.ts') {
    newFilePath = newFilePath.replace(/\.ts$/, '.js')
  }

  // write code to output file
  await fs.promises.writeFile(newFilePath, transformedCode, 'utf8')
}

export const buildFolder = async (
  folderPath: string,
  outputFolderPath: string
) => {
  // clear output folder if it exists else create it
  try {
    await fs.promises.rm(outputFolderPath, {recursive: true})
  } catch {}

  try {
    await fs.promises.mkdir(outputFolderPath)
  } catch {}

  for (const file of await fs.promises.readdir(folderPath)) {
    const filePath = path.resolve(folderPath, file)
    const outputFilePath = path.resolve(outputFolderPath, file)

    // check if javascript or typescript file
    if (/\.js$/.test(file) || /\.ts$/.test(file)) {
      // `app.js` is the main file for the serverless app, so we don't want to
      // build it because we only want to build the functions
      if (['app.js'].includes(file)) {
        continue
      }

      try {
        await buildFile(filePath, outputFilePath)
      } catch (err) {
        console.warn(`Can't build file ${filePath}`, err)
      }
    } else {
      // exclude template files from copying that are not js or ts files
      if (TEMPLATE_FILES.some(({name}) => name === file)) {
        continue
      }

      // exculude node_modules, dist, yarn.lock, and package-lock.json
      if (
        ['node_modules', 'dist', 'yarn.lock', 'package-lock.json'].includes(
          file
        )
      ) {
        continue
      }

      try {
        await fs.promises.copyFile(filePath, outputFilePath)
      } catch (err) {
        console.warn(`Can't copy file ${filePath}`, err)
      }
    }
  }
}
