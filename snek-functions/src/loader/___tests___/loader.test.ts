import path from "path";

import * as loader from "../loader";

describe("loadPaths", () => {
  it("should return an array of absolute paths", async () => {
    const absolutePath = path.resolve(
      __dirname,
      "./__fixtures__/folder-with-files"
    );
    const files = await loader.loadPaths(absolutePath);

    // check if files contains some files from the folder
    expect(files).toEqual(
      expect.arrayContaining([
        path.resolve(absolutePath, "test1.ts"),
        path.resolve(absolutePath, "test2.js"),
        path.resolve(absolutePath, "test3.txt"),
      ])
    );
  });
  it("should return an empty array if the path is not a directory", async () => {
    const absolutePath = path.resolve(
      __dirname,
      "./__fixtures__/folder-with-files/does-not-exist-or-file"
    );
    const files = await loader.loadPaths(absolutePath);

    expect(files).toEqual([]);
  });
});

describe("validatePaths", () => {
  it("should return an array of valid and invalid paths", () => {
    const paths = ["./test1.ts", "./test2.js", "./test3.txt"];
    const allowedExtensions = ["ts", "js"];
    const { invalidPaths, validPaths } = loader.validatePaths(
      paths,
      allowedExtensions
    );

    expect(invalidPaths).toEqual(["./test3.txt"]);
    expect(validPaths).toEqual(["./test1.ts", "./test2.js"]);
  });
});

describe("loadModule", () => {
  it("should load a basic .js file", async () => {
    const absolutePath = path.resolve(
      __dirname,
      "./__fixtures__/folder-with-files/test2.js"
    );
    const module = await loader.loadModule(absolutePath);

    console.log("module", module.test);

    expect(module).toBeDefined();
    expect(module.test).toBeDefined();
    expect(module.test()).toBe(true);
  });
  it("should load a es6 .js file", async () => {
    const absolutePath = path.resolve(
      __dirname,
      "./__fixtures__/folder-with-files/test-es6.js"
    );
    const module = await loader.loadModule(absolutePath);

    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
    expect(module.default.test).toBeDefined();
    expect(module.default.test()).toBe(true);
  });
  it("should load a .ts file", async () => {
    const absolutePath = path.resolve(
      __dirname,
      "./__fixtures__/folder-with-files/test1.ts"
    );
    const module = await loader.loadModule(absolutePath);

    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
    expect(module.default.test).toBeDefined();
    expect(module.default.test()).toBe(true);
  });
});
