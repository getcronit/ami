import express from "express";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
  sendResult,
} from "graphql-helix";
import schemaBuilder from "../../schemaBuilder";
import { buildFolder } from "../../fileBuilder";
import loadModules from "../../loader";
import { GraphQLSchema } from "graphql";

export default async (options: {
  port: number;
  functions: string;
  watchFunctions: boolean;
}) => {
  const loadSchema = async (functionDir: string) =>
    await schemaBuilder(await loadModules(functionDir));

  let schema: GraphQLSchema;

  if (options.watchFunctions) {
    const chokidar = await import("chokidar");

    const watcher = chokidar.watch(options.functions, {
      ignored: /^\./,
      persistent: true,
    });

    const dstPath = `${options.functions}/dist`;

    await buildFolder(options.functions, dstPath);

    schema = await loadSchema(dstPath);

    watcher.on("all", async (_event, _path) => {
      console.log("rebuilding schema");
      await buildFolder(options.functions, dstPath);

      schema = await loadSchema(dstPath);
    });
  } else {
    schema = await loadSchema(options.functions);
  }

  const app = express();

  app.use(express.json());

  app.use("/graphql", async (req, res) => {
    // Create a generic Request object that can be consumed by Graphql Helix's API
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    };

    // Determine whether we should render GraphiQL instead of returning an API response
    if (shouldRenderGraphiQL(request)) {
      res.send(renderGraphiQL());
    } else {
      // Extract the Graphql parameters from the request
      const { operationName, query, variables } = getGraphQLParameters(request);

      // Validate and execute the query
      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
      });

      // processRequest returns one of three types of results depending on how the server should respond
      // 1) RESPONSE: a regular JSON payload
      // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
      // 3) PUSH: a stream of events to push back down the client for a subscription
      // The "sendResult" is a NodeJS-only shortcut for handling all possible types of Graphql responses,
      // See "Advanced Usage" below for more details and customizations available on that layer.
      sendResult(result, res);
    }
  });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`GraphQL server is running on port ${port}.`);
  });
};
