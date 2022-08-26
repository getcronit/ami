import {execSync, spawnSync} from 'child_process'
import {readPackageJson, writePackageJson} from './utils.js'

export function generateTemplate(
  rootPath: string,
  template: string,
  name: string
) {
  if (!rootPath) {
    throw new Error('Missing root path')
  }

  console.log(`Initializing functions directory at ${rootPath}`)

  // Check if templateUrl is a valid url
  new URL(template)

  execSync(`git clone -b main ${template} ${rootPath}`)

  updatePackageJson(rootPath, name)

  resetGit(rootPath)

  // yarn install in functions directory
  spawnSync(`yarn`, {
    stdio: 'inherit',
    cwd: rootPath
  })
}

function resetGit(rootPath: string) {
  execSync(
    `rm -rf .git && git init -b main && git add . && git commit -m "Initial commit"`,
    {
      cwd: rootPath
    }
  )
}

function updatePackageJson(rootPath: string, name: string) {
  const packageJson = readPackageJson(rootPath)

  // Get last folder name from rootPath
  packageJson.name = name

  // Echo package.json back to file
  writePackageJson(packageJson, rootPath)
}
