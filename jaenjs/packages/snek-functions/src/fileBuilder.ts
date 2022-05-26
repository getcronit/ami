import {transformFile} from '@swc/core'
import fs from 'fs'
import path from 'path'

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
    // continue if not .js or .ts file
    if (!['.js', '.ts'].includes(path.extname(file))) {
      continue
    }

    // `app.js` is the main file for the serverless app, so we don't want to
    // build it because we only want to build the functions
    if (['app.js'].includes(file)) {
      continue
    }

    const filePath = path.resolve(folderPath, file)
    const outputFilePath = path.resolve(outputFolderPath, file)

    try {
      await buildFile(filePath, outputFilePath)
    } catch (err) {
      console.warn(`Can't build file ${filePath}`, err)
    }
  }
}
