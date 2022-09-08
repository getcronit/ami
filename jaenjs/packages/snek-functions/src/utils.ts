export async function importFresh(modulePath: string) {
  const cacheBustingModulePath = `${modulePath}?update=${Date.now()}`
  return await import(cacheBustingModulePath)
}

export function stringify(data: {[x: string]: any} | any[]): any {
  if (typeof data !== 'object' || Array.isArray(data)) {
    // not an object, stringify using native function
    return JSON.stringify(data)
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object.keys(data)
    .map(key => `${key}:${stringify(data[key])}`)
    .join(',')
  return `{${props}}`
}

export const buildGraphqlQueryString = ({
  name,
  args
}: {
  name: string
  args?: {[x: string]: any} | any[]
}) => {
  const argsQuery = args ? `(fnArgs: ${stringify(args)})` : ''

  return JSON.stringify({
    query: `
        mutation {
          ${name}${argsQuery} 
        }
      `
  })
}
