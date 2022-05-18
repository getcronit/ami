import {SnekApi, KeyManager} from '@snek-at/snek-api-client'

import {stringify} from '../utils.js'
import {SnekFunction} from './types.js'

const SNEK_FUNCTION_URL =
  process.env.SNEK_FUNCTION_URL ||
  // Gatsby needs a special prefix for its environment variables
  // See: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#accessing-environment-variables-in-the-browser
  process.env.GATSBY_SNEK_FUNCTION_URL

class FunctionFactory {
  static makeFn<FunctionArgs, FunctionReturn>(
    snekFunction: (
      args: FunctionArgs,
      snekApi: SnekApi
    ) => Promise<FunctionReturn | null>,
    options: {
      name: string
    }
  ): SnekFunction<FunctionArgs, FunctionReturn> {
    const fn: SnekFunction<FunctionArgs, FunctionReturn> = async args => {
      const {data} = await fn.execute(args)

      return data
    }

    fn.options = options
    fn.execute = async args => {
      if (!SNEK_FUNCTION_URL) {
        throw new Error(
          'SNEK_FUNCTION_URL environment variable is not defined. Please define it in your environment. If you are using Gatsby, use GATSBY_SNEK_FUNCTION_URL instead.'
        )
      }

      const snekApiHeaders = KeyManager.getHeaders()

      console.log('snekApiHeaders', snekApiHeaders)

      const res = await fetch(SNEK_FUNCTION_URL, {
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
    }

    fn.server = snekFunction

    return fn
  }

  static browserMakeFn<FunctionArgs, FunctionReturn>(
    snekFunction: (
      args: FunctionArgs,
      snekApi: SnekApi
    ) => Promise<FunctionReturn | null>,

    options: {
      name: string
    }
  ): SnekFunction<FunctionArgs, FunctionReturn> {
    const fn = FunctionFactory.makeFn(snekFunction, options)

    fn.server = () => {
      throw new Error(
        'Executing a server function in the browser is not supported.'
      )
    }

    return fn
  }
}

export default FunctionFactory
