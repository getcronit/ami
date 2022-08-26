import child_process, {spawnSync} from 'child_process'

export function generateTemplate(
  rootPath: string,
  template: string | undefined
) {
  if (!rootPath) {
    throw new Error('Missing root path')
  }

  let templateUrl: string

  console.log(`Initializing functions directory at ${rootPath}`)

  if (template) {
    console.log(`Using template ${template}`)

    templateUrl = template
  } else {
    templateUrl = 'https://github.com/snek-functions/template.git'
  }

  // Check if templateUrl is a valid url
  new URL(templateUrl)

  child_process.execSync(`git clone -b main ${templateUrl} ${rootPath}`)

  // yarn install in functions directory
  spawnSync(`yarn`, {
    stdio: 'inherit',
    cwd: rootPath
  })
}
