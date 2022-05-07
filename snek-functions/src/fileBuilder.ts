import { transformFile } from "@swc/core";
import fs from "fs";
import path from "path";

export const buildFile = async (filePath: string, outputFilePath: string) => {
  const extname = path.extname(filePath);

  const { code } = await transformFile(filePath, {});

  console.log("code", code);

  let newFilePath = outputFilePath;

  // change file extension to .js if it's a .ts file
  if (extname === ".ts") {
    newFilePath = newFilePath.replace(/\.ts$/, ".js");
  }

  // write code to output file
  await fs.promises.writeFile(newFilePath, code, "utf8");
};

export const buildFolder = async (
  folderPath: string,
  outputFolderPath: string
) => {
  // clear output folder if it exists else create it
  try {
    await fs.promises.rm(outputFolderPath, { recursive: true });
  } catch {}

  try {
    await fs.promises.mkdir(outputFolderPath);
  } catch {}

  for (const file of await fs.promises.readdir(folderPath)) {
    // continue if not .js or .ts file
    if (![".js", ".ts"].includes(path.extname(file))) {
      continue;
    }

    const filePath = path.resolve(folderPath, file);
    const outputFilePath = path.resolve(outputFolderPath, file);

    try {
      await buildFile(filePath, outputFilePath);
    } catch (err) {
      console.warn(`Can't build file ${filePath}`, err);
    }
  }
};
