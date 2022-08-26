import {execSync} from 'child_process'

export function readPackageJson(cwd: string): {
  [key: string]: any
} {
  return JSON.parse(
    execSync('cat package.json', {
      cwd
    }).toString()
  )
}

export function writePackageJson(
  packageJson: {[key: string]: any},
  rootPath: string
) {
  execSync(`echo '${JSON.stringify(packageJson, null, 2)}' > package.json`, {
    cwd: rootPath
  })
}
