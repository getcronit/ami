import { makeFn } from "../../dist";

const login2 = makeFn<{ username: string; password: string }, boolean>(
  async (args) => {
    console.log("args", args);
    return {
      rand: Math.random(),
      ok: args.username === "admin" && args.password === "admin3",
    };
  },
  {
    name: "login",
  }
);

export default login2;
