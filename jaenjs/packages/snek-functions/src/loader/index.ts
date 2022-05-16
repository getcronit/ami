import { loadPaths, validatePaths, loadModule } from "./loader";

const loadModules = async (absoluteFolderPath: string) => {
  const files = await loadPaths(absoluteFolderPath);
  console.log("paths", files);
  const { validPaths } = validatePaths(files, ["ts", "js"]);
  const modules = [];

  for (const file of validPaths) {
    const module = await loadModule(file);
    if (module) {
      modules.push(module);
    }
  }

  console.log("modules", modules);

  return modules;
};

export default loadModules;
