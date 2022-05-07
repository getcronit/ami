import { FunctionFactoryBlueprint, SnekFunction } from "./functions";

import "isomorphic-fetch";

import { stringify } from "./utils";
import { SnekApi } from "./snekApi";

const SNEK_FUNCTION_URL =
  process.env.SNEK_FUNCTION_URL ||
  // Gatsby needs a special prefix for its environment variables
  // See: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#accessing-environment-variables-in-the-browser
  process.env.GATSBY_SNEK_FUNCTION_URL ||
  "http://localhost:4000/graphql";

class FunctionFactory extends FunctionFactoryBlueprint {
  makeFn<FunctionArgs, FunctionReturn>(
    snekFunction: (
      args: FunctionArgs,
      snekApi: SnekApi
    ) => Promise<FunctionReturn>,
    options: {
      name: string;
    }
  ): SnekFunction<FunctionArgs, FunctionReturn> {
    const fn: SnekFunction<FunctionArgs, FunctionReturn> = async (args) => {
      const { data } = await fn.execute(args);

      return data;
    };

    fn.options = options;
    fn.execute = async (args) => {
      const res = await fetch(SNEK_FUNCTION_URL, {
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

      const { data, errors } = await res.json();

      return {
        data: JSON.parse(data[options.name]),
        errors: errors || [],
      };
    };

    fn.server = snekFunction;

    return fn;
  }
}

export default new FunctionFactory();
