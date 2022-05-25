export function removeEmpty(obj: {[x: string]: any}): object {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
      delete obj[prop]
    }
  }
  return obj
}
