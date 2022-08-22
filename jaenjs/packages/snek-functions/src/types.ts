import {SnekApi} from '@snek-at/snek-api-client'
import * as express from 'express'

export type ServerContext = {
  req: express.Request
  res: express.Response
}

export type SnekFunction<FunctionArgs, FunctionReturn> = {
  (args: FunctionArgs): Promise<FunctionReturn>
  server: (
    args: FunctionArgs,
    snekApi: SnekApi,
    context: ServerContext
  ) => Promise<FunctionReturn | null>
  execute: (
    args: FunctionArgs
  ) => Promise<{
    res: Response | undefined
    data: FunctionReturn
    errors: any[]
  }>
  options: {
    name: string
    decorators?: Array<SnekFunction<FunctionArgs, void>['server']>
  }
}
