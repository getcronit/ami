import { initFunctionsDir } from "../../init";

export default async (options: { functionsPath: string }) => {
  await initFunctionsDir(options.functionsPath);
};
