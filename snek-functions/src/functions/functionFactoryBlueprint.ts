export type SnekFunction<FunctionArgs, FunctionReturn> = {
  (args: FunctionArgs): Promise<FunctionReturn>;
  server: (args: FunctionArgs) => Promise<FunctionReturn>;
  options: {
    name: string;
  };
};

export abstract class FunctionFactoryBlueprint {
  abstract makeFn<FunctionArgs, FunctionReturn>(
    snekFunction: (args: FunctionArgs) => Promise<FunctionReturn>,
    options: {
      name: string;
    }
  ): SnekFunction<FunctionArgs, FunctionReturn>;
}
