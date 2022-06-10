export interface TempalteFile {
  name: string
  content: string
}

export const app = {
  name: 'app.js',
  content: `import getServerlessApp from '@snek-at/functions/dist/getServerlessApp.js'

export async function handler(event, context) {
  return await getServerlessApp({
    functions: '.'
  })(event, context)
}
`
}

export const factory = {
  name: 'factory.ts',
  content: `import {makeFn} from '@snek-at/functions'

export const fn = makeFn({
  url: 'https://<your-snek-functions-url>'
})
`
}

export const exampleLoginFn = {
  name: 'exampleLogin.ts',
  content: `import { fn } from "./factory";

const exampleLogin = fn<{ username: string; password: string }, boolean>(
  async (args) => {
    return args.username === "admin" && args.password === "admin";
  },
  {
    name: "exampleLogin",
  }
);

export default exampleLogin;
`
}

export const packageJson = {
  name: 'package.json',
  content: `{
  "name": "snek-functions",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "description": "Generated with \`snek-functions init -f functions\`",
  "author": "snek-at",
  "dependencies": {
    "@snek-at/functions": "*"
  },
  "scripts": {
    "start": "IS_OFFLINE=true nodemon --watch dist --exec sls offline",
    "deploy": "sls deploy"
  }
}
`
}

export const dockerfile = {
  name: 'Dockerfile',
  content: `FROM node:16

ENV LAMBDA_TASK_ROOT=/var/task
ENV SNEK_FUNCTIONS_BUILD_DIR=/tmp/snek-functions

WORKDIR \${LAMBDA_TASK_ROOT}

COPY --from=amazon/aws-lambda-nodejs:latest /usr/local/bin/aws-lambda-rie /usr/local/bin/aws-lambda-rie
COPY --from=amazon/aws-lambda-nodejs:latest /var/runtime /var/runtime
COPY --from=amazon/aws-lambda-nodejs:latest /var/lang /var/lang
COPY --from=amazon/aws-lambda-nodejs:latest lambda-entrypoint.sh .
COPY --from=amazon/aws-lambda-nodejs:latest /etc/pki/tls/certs/ca-bundle.crt /etc/pki/tls/certs/ca-bundle.crt
# Override /bin/sh because some scripts are only compatible with the amazon version
COPY --from=amazon/aws-lambda-nodejs:latest /bin/sh /bin/sh

RUN cp /usr/local/bin/node /var/lang/bin/node

# Add static files from . to task root
COPY package.json app.js \${LAMBDA_TASK_ROOT}/
# Copy all files form the . to the build dir
COPY ./ \${SNEK_FUNCTIONS_BUILD_DIR}/

WORKDIR \${SNEK_FUNCTIONS_BUILD_DIR}

RUN npm install
RUN npx snek-functions build --functions-path .
# Copy the built functions to the lambda function
RUN cp -r dist node_modules \${LAMBDA_TASK_ROOT}

WORKDIR \${LAMBDA_TASK_ROOT}

ENTRYPOINT [ "./lambda-entrypoint.sh" ]
CMD [ "app.handler" ]
`
}

export const serverlessYml = {
  name: 'serverless.yml',
  content: `service: snek-functions-graphql-helix-express
frameworkVersion: '3'

plugins:
  - serverless-offline
  - serverless-plugin-ifelse

custom:
  isOffline: \${env:IS_OFFLINE, "false"}
  serverlessIfElse:
    - If: '"\${self:custom.isOffline}" != "true"'
      Exclude:
        - functions.endpoint.handler
      ElseExclude:
        - functions.endpoint.image

provider:
  name: aws
  region: eu-central-1

  ecr:
    images:
      appimage:
        path: ./

functions:
  endpoint:
    image: appimage
    handler: app.handler
    events:
      - httpApi:
          path: '*'
          method: '*'
`
}

export const TEMPLATE_FILES = [
  app,
  factory,
  exampleLoginFn,
  packageJson,
  dockerfile,
  serverlessYml
]
