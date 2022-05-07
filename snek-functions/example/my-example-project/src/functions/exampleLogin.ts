import { makeFn } from "@snek-at/functions";

const exampleLogin = makeFn<{ username: string; password: string }, boolean>(
  async (args) => {
    return args.username === "admin" && args.password === "admin";
  },
  {
    name: "exampleLogin",
  }
);

export default exampleLogin;
