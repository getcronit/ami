import { print, parse, transform } from "@swc/core";
import fs from "fs";
import path from "path";

export const buildFile = async (filePath: string, outputFilePath: string) => {
  console.log(`building ${filePath} to ${outputFilePath}`);
  const sourceCode = await fs.promises.readFile(filePath, "utf8");

  const parsed = await print(
    await parse(sourceCode, {
      syntax: "typescript",
      comments: false,
      script: true,
    })
  );

  const { code } = await transform(parsed.code, {
    module: {
      type: "commonjs",
    },
  });

  let newFilePath = outputFilePath;

  // change file extension to .js if it's a .ts file
  if (path.extname(filePath) === ".ts") {
    newFilePath = newFilePath.replace(/\.ts$/, ".js");
  }
  console.log(`extension changed to ${path.extname(newFilePath)}`);
  console.log(`writing ${newFilePath}`);

  // write code to output file
  await fs.promises.writeFile(newFilePath, code, "utf8");
};

export const buildFolder = async (
  folderPath: string,
  outputFolderPath: string
) => {
  const files = await fs.promises.readdir(folderPath);

  // clear output folder if it exists else create it
  try {
    await fs.promises.access(outputFolderPath);
    await fs.promises.rmdir(outputFolderPath, { recursive: true });
  } catch {}

  await fs.promises.mkdir(outputFolderPath);

  for (const file of files) {
    if (file === "dist") {
      continue;
    }

    const filePath = path.resolve(folderPath, file);
    const outputFilePath = path.resolve(outputFolderPath, file);

    await buildFile(filePath, outputFilePath);
  }
};
