import {SnekApi} from '@snek-at/snek-api-client'
import * as express from 'express'

export type ConfigureApp = (app: express.Express) => void

export type ServerContext = {
  req: express.Request
  res: express.Response
}

export type Decorator<
  FunctionArgs extends BaseFunctionArgs = any,
  FunctionReturn = void
> = SnekFunction<FunctionArgs, FunctionReturn>['server']

export type BaseFunctionArgs = {[x: string]: any} | any[]

type SnekFunctionExecuteArgs<FunctionArgs extends BaseFunctionArgs> = [
  args?: FunctionArgs,
  init?: {
    headers: Record<string, string>
  }
]

export type SnekFunction<
  FunctionArgs extends BaseFunctionArgs,
  FunctionReturn
> = {
  (...args: SnekFunctionExecuteArgs<FunctionArgs>): Promise<FunctionReturn>
  server: (
    args: FunctionArgs,
    snekApi: SnekApi,
    context: ServerContext
  ) => Promise<FunctionReturn | null>
  execute: (
    ...args: SnekFunctionExecuteArgs<FunctionArgs>
  ) => Promise<{
    res: Response | undefined
    data: FunctionReturn
    errors: any[]
  }>
  options: {
    name: string
    decorators?: Array<Decorator<FunctionArgs>>
  }
  globalDecorators?: Array<Decorator<FunctionArgs>>
}
