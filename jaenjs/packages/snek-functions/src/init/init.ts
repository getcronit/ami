import fs from "fs";
import path from "path";

import * as files from "./files";

export const initFunctionsDir = async (functionsPath: string) => {
  const functionsDir = path.resolve(functionsPath);

  if (!fs.existsSync(functionsDir)) {
    fs.mkdirSync(functionsDir);
  }

  const writeFile = (templateFile: files.TempalteFile) => {
    const filePath = path.join(functionsDir, templateFile.name);
    fs.writeFileSync(filePath, templateFile.content);
  };

  // write files to functions directory
  for (const templateFile of files.TEMPLATE_FILES) {
    writeFile(templateFile);
  }
};
