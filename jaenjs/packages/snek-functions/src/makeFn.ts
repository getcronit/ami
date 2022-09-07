import {KeyManager} from '@snek-at/snek-api-client'

import {Decorator, SnekFunction} from './types.js'
import {buildGraphqlQueryString} from './utils.js'

export interface MakeFnOptions {
  url: string
  decorators?: Array<{
    decorator: Decorator
    includes?: string[]
    excludes?: string[]
  }>
}

export const makeFn = ({url, decorators}: MakeFnOptions) => <
  FunctionArgs,
  FunctionReturn
>(
  snekFunction: SnekFunction<FunctionArgs, FunctionReturn>['server'],
  options: SnekFunction<FunctionArgs, FunctionReturn>['options']
): SnekFunction<FunctionArgs, FunctionReturn> => {
  const fn: SnekFunction<FunctionArgs, FunctionReturn> = async args => {
    const {data, errors} = await fn.execute(args)

    if (errors.length > 0) {
      throw new Error(errors[0].message)
    }

    return data
  }

  fn.options = options

  fn.execute = async (args, init) => {
    const snekApiHeaders = KeyManager.getHeaders()

    console.log('snekApiHeaders', snekApiHeaders)

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...snekApiHeaders,
          ...init?.headers
        },
        body: buildGraphqlQueryString({
          name: options.name,
          args: {
            ...args
          }
        }),
        credentials: 'include'
      })

      const {data, errors} = await res.json()

      return {
        res: res as any,
        data: JSON.parse(data[options.name]),
        errors: errors || []
      }
    } catch (err) {
      console.error(err)
      return {
        res: undefined,
        data: null,
        errors: [err]
      }
    }
  }

  fn.server = snekFunction

  if (decorators) {
    fn.globalDecorators = []

    const shouldSkipDecorator = (
      decorator: Decorator,
      includes?: string[],
      excludes?: string[]
    ) => {
      if (includes) {
        return !includes.includes(decorator.name)
      } else if (excludes) {
        return excludes.includes(decorator.name)
      } else {
        return false
      }
    }

    for (const {decorator, includes: inclds, excludes: exclds} of decorators) {
      if (!shouldSkipDecorator(decorator, inclds, exclds)) {
        fn.globalDecorators.push(decorator)
      }
    }
  }

  return fn
}

export const browserMakeFn: typeof makeFn = args => (snekFunction, options) => {
  const fn = makeFn(args)(snekFunction, options)

  fn.server = () => {
    throw new Error(
      'Executing a server function in the browser is not supported.'
    )
  }

  return fn
}
