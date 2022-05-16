import { buildFolder } from "../../fileBuilder";

export default async (options: { functionsPath: string }) => {
  const { functionsPath } = options;

  const dstPath = `${functionsPath}/dist`;

  await buildFolder(functionsPath, dstPath);
};
