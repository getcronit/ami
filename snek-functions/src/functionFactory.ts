import { FunctionFactoryBlueprint, SnekFunction } from "./functions";

import "isomorphic-fetch";

import { stringify } from "./utils";

class FunctionFactory extends FunctionFactoryBlueprint {
  makeFn<FunctionArgs, FunctionReturn>(
    snekFunction: (args: FunctionArgs) => Promise<FunctionReturn>,
    options: {
      name: string;
    }
  ): SnekFunction<FunctionArgs, FunctionReturn> {
    const fn: SnekFunction<FunctionArgs, FunctionReturn> = async (args) => {
      // send graphql request via post to snek-server or local server

      console.log(
        "body",
        JSON.stringify({
          query: `
            mutation {
              ${options.name}(fnArgs: ${stringify(args)})
            }
          `,
        })
      );

      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              mutation {
                ${options.name}(fnArgs: ${stringify(args)})
              }
            `,
        }),
      });

      const json = await res.json();

      console.log("json", json);

      return {} as FunctionReturn;
    };

    fn.options = options;
    fn.server = snekFunction;

    return fn;
  }
}

export default new FunctionFactory();
