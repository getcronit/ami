import { makeFn } from "../../dist";

const login = makeFn<{ username: string; password: string }, boolean>(
  async (args) => {
    return args.username === "admin" && args.password === "admin";
  },
  {
    name: "otherfn",
  }
);

export default login;
