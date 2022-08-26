import {KeyManager, snekApi} from '@snek-at/snek-api-client'
import {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'

import {ServerContext, SnekFunction} from '../types.js'

const functionData = new GraphQLScalarType({
  name: 'FunctionData',
  description: 'Data of a executed function',
  serialize(value) {
    return JSON.stringify(value) // Convert outgoing Date to integer for JSON
  },
  parseValue(value: any) {
    return JSON.parse(value)
  }
})

const schemaBuilder = async (
  functions: Array<SnekFunction<any, any>>
): Promise<GraphQLSchema> => {
  const fields = functions.reduce((acc, fn) => {
    const name = fn.options.name

    acc[name] = {
      type: functionData,
      args: {
        fnArgs: {
          type: new GraphQLScalarType({
            name: `${name.charAt(0).toUpperCase() + name.slice(1)}Args`,
            description: `Arguments for ${name} function`,
            serialize(value) {
              return JSON.stringify(value)
            }
          })
        }
      },
      resolve: async (
        _: unknown,
        args: {fnArgs: any},
        context: ServerContext
      ) => {
        const {req} = context

        const headers: {[key: string]: any} = req.headers

        const accessToken = headers[KeyManager.X_SNEK_API_TOKEN]
        const refreshToken = headers[KeyManager.X_SNEK_API_REFRESH_TOKEN]

        if (accessToken) {
          KeyManager.setAccessToken(accessToken)
        }

        if (refreshToken) {
          KeyManager.setRefreshToken(refreshToken)
        }

        snekApi.KeyManager = KeyManager

        if (fn.globalDecorators) {
          for (const decorator of fn.globalDecorators) {
            await decorator(args.fnArgs || {}, snekApi, context)
          }
        }

        if (fn.options.decorators) {
          for (const decorator of fn.options.decorators) {
            await decorator(args.fnArgs || {}, snekApi, context)
          }
        }

        const result = await fn.server(args.fnArgs || {}, snekApi, context)

        snekApi.KeyManager.clearTokens()

        return result
      }
    }

    return acc
  }, {} as {[key: string]: any})

  const schema = new GraphQLSchema({
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        ping: {
          type: GraphQLString,
          resolve: () => 'pong'
        },
        ...fields
      }
    }),
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        ping: {
          type: GraphQLString,
          resolve: () => 'pong'
        }
      }
    })
  })

  return schema
}

export default schemaBuilder
