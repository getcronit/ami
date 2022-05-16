import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLScalarType
} from 'graphql'
import {SnekFunction} from './functions'
import {KeyManager, snekApi} from '@snek-at/snek-api-client'

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
    console.log('fn', fn)

    const name = fn.options.name

    console.log('name', name)

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
        context: {
          headers: {[key: string]: string}
        }
      ) => {
        const headers = context.headers

        const accessToken = headers[KeyManager.X_SNEK_API_TOKEN]
        const refreshToken = headers[KeyManager.X_SNEK_API_REFRESH_TOKEN]

        if (accessToken) {
          KeyManager.setAccessToken(accessToken)
        }

        if (refreshToken) {
          KeyManager.setRefreshToken(refreshToken)
        }

        snekApi.KeyManager = KeyManager

        const result = await fn.server(args.fnArgs || {}, snekApi)

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
