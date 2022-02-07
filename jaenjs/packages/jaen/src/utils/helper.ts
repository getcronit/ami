export const omitSingle = (key: string, {[key]: _, ...obj}) => obj

export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}
