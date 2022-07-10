import {SnekApi} from '@snek-at/snek-api-client'

export type SnekFunction<FunctionArgs, FunctionReturn> = {
  (args: FunctionArgs): Promise<FunctionReturn>
  server: (
    args: FunctionArgs,
    snekApi: SnekApi,
    req: Request
  ) => Promise<FunctionReturn | null>
  execute: (
    args: FunctionArgs
  ) => Promise<{
    data: FunctionReturn
    errors: any[]
  }>
  options: {
    name: string
  }
}
