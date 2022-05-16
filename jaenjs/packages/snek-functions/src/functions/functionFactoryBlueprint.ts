import {SnekApi} from '@snek-at/snek-api-client'

export type SnekFunction<FunctionArgs, FunctionReturn> = {
  (args: FunctionArgs): Promise<FunctionReturn>
  server: (
    args: FunctionArgs,
    snekApi: SnekApi
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

export abstract class FunctionFactoryBlueprint {
  abstract makeFn<FunctionArgs, FunctionReturn>(
    snekFunction: (args: FunctionArgs) => Promise<FunctionReturn>,
    options: {
      name: string
    }
  ): SnekFunction<FunctionArgs, FunctionReturn>
}
