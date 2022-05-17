import fs from 'fs'
import path from 'path'
import {spawnSync} from 'child_process'

import * as files from './files.js'

export const initFunctionsDir = async (functionsPath: string) => {
  const functionsDir = path.resolve(functionsPath)

  if (!fs.existsSync(functionsDir)) {
    fs.mkdirSync(functionsDir)
  }

  const writeFile = (templateFile: files.TempalteFile) => {
    const filePath = path.join(functionsDir, templateFile.name)
    fs.writeFileSync(filePath, templateFile.content)
  }

  // write files to functions directory
  for (const templateFile of files.TEMPLATE_FILES) {
    writeFile(templateFile)
  }

  // yarn install in functions directory
  spawnSync(`yarn`, {
    stdio: 'inherit',
    cwd: functionsDir
  })
}
