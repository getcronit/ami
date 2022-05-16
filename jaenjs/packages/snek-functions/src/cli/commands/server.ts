import { getApp } from "../../app";

export default async (options: {
  port: number;
  functionsPath: string;
  watch: boolean;
}) => {
  const app = await getApp({
    functions: options.functionsPath,
    watch: options.watch,
  });

  app.listen(options.port, () => {
    console.log(`GraphQL server is running on port ${options.port}.`);
  });
};
