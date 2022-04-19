export const toBoolean = (value: string | boolean) => {
  if (typeof value === 'string') {
    return value === 'true'
  }
  return value
}
