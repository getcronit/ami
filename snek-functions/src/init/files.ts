export interface TempalteFile {
  name: string;
  content: string;
}

export const app = {
  name: "app.ts",
  content: `import getServerlessApp from "@snek-at/functions/dist/getServerlessApp";

export async function handler(event: Object, context: Object) {
  return await getServerlessApp({ functions: "." })(event, context);
}
`,
};

export const exampleLoginFn = {
  name: "exampleLogin.ts",
  content: `import { makeFn } from "@snek-at/functions";

const exampleLogin = makeFn<{ username: string; password: string }, boolean>(
  async (args) => {
    return args.username === "admin" && args.password === "admin";
  },
  {
    name: "exampleLogin",
  }
);

export default exampleLogin;
`,
};

export const packageJson = {
  name: "package.json",
  content: `{
  "name": "snek-functions",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "description": "Generated with \`snek-functions init -f functions\`",
  "author": "snek-at",
  "dependencies": {
    "@snek-at/functions": "*"
  }
}
`,
};

export const dockerfile = {
  name: "Dockerfile",
  content: `FROM public.ecr.aws/lambda/nodejs:14

# Install dependencies
RUN npm install --production

# Build snek-functions
RUN snek-functions build --functions-path .

# Copy function code
COPY package.json node_modules dist/* \${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]
`,
};

export const TEMPLATE_FILES = [app, exampleLoginFn, packageJson, dockerfile];
