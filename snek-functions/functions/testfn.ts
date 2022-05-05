import { makeFn } from "../../dist";

const testfn = makeFn<{ username: string; password: string }, boolean>(
  async (args) => {
    return args.username === "admin" && args.password === "admin";
  },
  {
    name: "testfn",
  }
);

export default testfn;
