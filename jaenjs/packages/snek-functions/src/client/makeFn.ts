import {KeyManager, SnekApi} from '@snek-at/snek-api-client'

import {SnekFunction} from '../types.js'
import {stringify} from '../utils.js'

export const makeFn = ({url}: {url: string}) => <FunctionArgs, FunctionReturn>(
  snekFunction: (
    args: FunctionArgs,
    snekApi: SnekApi,
    req: Request
  ) => Promise<FunctionReturn | null>,
  options: {
    name: string
  }
): SnekFunction<FunctionArgs, FunctionReturn> => {
  const fn: SnekFunction<FunctionArgs, FunctionReturn> = async args => {
    const {data} = await fn.execute(args)

    return data
  }

  fn.options = options
  fn.execute = async args => {
    const snekApiHeaders = KeyManager.getHeaders()

    console.log('snekApiHeaders', snekApiHeaders)

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...snekApiHeaders
        },
        body: JSON.stringify({
          query: `
              mutation {
                ${options.name}(fnArgs: ${stringify(args)})
              }
            `
        })
      })

      const {data, errors} = await res.json()

      return {
        data: JSON.parse(data[options.name]),
        errors: errors || []
      }
    } catch (err) {
      console.error(err)
      return {
        data: null,
        errors: [err]
      }
    }
  }

  fn.server = snekFunction

  return fn
}

export const browserMakeFn = (args: {url: string}) => <
  FunctionArgs,
  FunctionReturn
>(
  snekFunction: (
    args: FunctionArgs,
    snekApi: SnekApi,
    req: Request
  ) => Promise<FunctionReturn | null>,
  options: {
    name: string
  }
): SnekFunction<FunctionArgs, FunctionReturn> => {
  const fn = makeFn(args)(snekFunction, options)

  fn.server = () => {
    throw new Error(
      'Executing a server function in the browser is not supported.'
    )
  }

  return fn
}
