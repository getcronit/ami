import React from 'react'

export const omitSingle = (key: string, {[key]: _, ...obj}) => obj

export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export function cleanObject<T>(obj: T): T {
  const getCircularReplacer = () => {
    const seen = new WeakSet()
    return (key: any, value: object | null) => {
      if (React.isValidElement(value)) {
        return
      }

      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return
        }
        seen.add(value)
      }
      return value
    }
  }

  return JSON.parse(JSON.stringify(obj, getCircularReplacer()))
}
