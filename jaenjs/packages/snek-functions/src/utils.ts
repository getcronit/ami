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
