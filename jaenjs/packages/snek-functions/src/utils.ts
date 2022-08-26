import {execSync} from 'child_process'

export async function importFresh(modulePath: string) {
  const cacheBustingModulePath = `${modulePath}?update=${Date.now()}`
  return (await import(cacheBustingModulePath)).default
}

export function stringify(obj_from_json: {[x: string]: any}): any {
  if (typeof obj_from_json !== 'object' || Array.isArray(obj_from_json)) {
    // not an object, stringify using native function
    return JSON.stringify(obj_from_json)
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object.keys(obj_from_json)
    .map(key => `${key}:${stringify(obj_from_json[key])}`)
    .join(',')
  return `{${props}}`
}

export const buildGraphqlQueryString = ({
  name,
  args
}: {
  name: string
  args: {[x: string]: any}
}) => {
  return JSON.stringify({
    query: `
      mutation {
        ${name}(fnArgs: ${stringify(args)})
      }
    `
  })
}

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
