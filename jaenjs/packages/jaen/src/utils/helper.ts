import deepmerge from 'deepmerge'
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

export const deepmergeArrayIdMerge = (
  target: any[],
  source: any[],
  options: any
) => {
  const groups = ['id', 'fieldName']

  for (const group of groups) {
    if (target.every(v => v[group]) && source.every(v => v[group])) {
      const mergeArrays = (arr1: any[] = [], arr2: any[] = [], key = 'id') => {
        const elements: any[] = []

        const arr2Copy = arr2.slice()

        for (const element of arr1) {
          const el = arr2Copy.find(v => v[key] === element[key])

          if (el) {
            elements.push(
              deepmerge(element, el, {
                ...options,
                arrayMerge: deepmergeArrayIdMerge
              })
            )
            arr2Copy.splice(arr2Copy.indexOf(el), 1)
          } else {
            elements.push(element)
          }
        }

        // append the rest of the elements
        elements.push(...arr2Copy)

        return elements
      }

      const merged = mergeArrays(target || [], source || [], group)

      console.log(
        JSON.parse(JSON.stringify(target || [])),
        JSON.parse(JSON.stringify(source || [])),
        group
      )

      console.log(merged)

      console.log(JSON.parse(JSON.stringify(merged)))

      return merged
    }
  }

  const destination = target.slice()

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, {
        ...options,
        arrayMerge: deepmergeArrayIdMerge
      })
    } else if (target.indexOf(item) === -1) {
      destination.push(item)
    }
  })

  return destination
}

export const getPackageJsonVersion = () => {
  const packageJson = require('../../package.json')
  return packageJson.version
}
