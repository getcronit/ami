import { AppOptions, getApp } from "./app";

import ServerlessHttp from "serverless-http";

export const getServerlessApp =
  (options: AppOptions) => async (event: Object, context: Object) => {
    if (typeof window !== "undefined") {
      return null;
    }

    return await ServerlessHttp(await getApp(options))(event, context);
  };

export default getServerlessApp;
