export interface TempalteFile {
  name: string
  content: string
}

export const app = {
  name: 'app.js',
  content: `import getServerlessApp from '@snek-at/functions/dist/server/getServerlessApp.js'

export async function handler(event, context) {
  return await getServerlessApp({
    functions: '.'
  })(event, context)
}
`
}

export const factory = {
  name: 'src/factory.ts',
  content: `import {makeFn} from '@snek-at/functions'

export const fn = makeFn({
  url: 'https://<your-snek-functions-url>'
})
`
}

export const exampleLoginFn = {
  name: 'src/exampleLogin.ts',
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
  "devDependencies": {
    "nodemon": "^2.0.19",
    "patch-package": "^6.4.7",
    "serverless": "^3.19.0",
    "serverless-offline": "^8.8.0",
    "serverless-plugin-ifelse": "^1.0.7"
  },
  "scripts": {
    "start": "IS_OFFLINE=true nodemon --watch dist --exec sls offline",
    "deploy": "sls deploy",
    "postinstall": "patch-package"
  }
}
`
}

export const dockerfile = {
  name: 'Dockerfile',
  content: `FROM node:16

LABEL description="This container serves as an entry point for our future Snek Function projects."
LABEL org.opencontainers.image.source="https://github.com/snek-at/origin"
LABEL maintainer="team@snek.at"

ENV LAMBDA_TASK_ROOT=/var/task \
    SNEK_FUNCTIONS_BUILD_DIR=/tmp/snek-functions

WORKDIR \${LAMBDA_TASK_ROOT}

COPY --from=amazon/aws-lambda-nodejs:latest /usr/local/bin/aws-lambda-rie /usr/local/bin/aws-lambda-rie
COPY --from=amazon/aws-lambda-nodejs:latest /var/runtime /var/runtime
COPY --from=amazon/aws-lambda-nodejs:latest /var/lang /var/lang
COPY --from=amazon/aws-lambda-nodejs:latest lambda-entrypoint.sh .
COPY --from=amazon/aws-lambda-nodejs:latest /etc/pki/tls/certs/ca-bundle.crt /etc/pki/tls/certs/ca-bundle.crt
# Override /bin/sh because some scripts are only compatible with the amazon version
COPY --from=amazon/aws-lambda-nodejs:latest /bin/sh /bin/sh

# Add static files from . to task root
COPY package.json app.js entrypoint.sh \${LAMBDA_TASK_ROOT}/
# Copy all files form the . to the build dir
COPY ./ \${SNEK_FUNCTIONS_BUILD_DIR}/

RUN chmod +x entrypoint.sh

WORKDIR \${SNEK_FUNCTIONS_BUILD_DIR}

RUN ln -s /usr/local/bin/node /var/lang/bin/node ;\
    npm install ;\
    npx snek-functions build --functions-path . ;\
    # Copy the built functions to the lambda function
    cp -r dist node_modules \${LAMBDA_TASK_ROOT}

WORKDIR \${LAMBDA_TASK_ROOT}

ENTRYPOINT [ "./entrypoint.sh" ]

# Start in serverless mode
#CMD [ "app.handler" ]
`
}

export const entrypoint = {
  name: 'entrypoint.sh',
  content: `#!/bin/sh

if [ $# -ne 1 ]; then
  echo "Start in continuous mode" 1>&2
  exec yarn snek-functions server -f $LAMBDA_TASK_ROOT/dist
fi
export _HANDLER="$1"

RUNTIME_ENTRYPOINT=/var/runtime/bootstrap
if [ -z "\${AWS_LAMBDA_RUNTIME_API}" ]; then
  exec /usr/local/bin/aws-lambda-rie $RUNTIME_ENTRYPOINT
else
  exec $RUNTIME_ENTRYPOINT
fi
`
}

export const dockercompose = {
  name: 'docker-compose.yml',
  content: `version: '3.1'

services:

#> Snek Function
  app:
    build: .
    ports:
      - "3000:4000/tcp"
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
    image:
      name: appimage
      command:
        - app.handler
    handler: app.handler
    events:
      - httpApi:
          path: '*'
          method: '*'
`
}

//> Workaround for the lack of esm support of serverless framework
export const patchesServerlessOffline = {
  name: 'patches/serverless-offline+8.8.0.patch',
  content: `diff --git a/node_modules/serverless-offline/dist/lambda/handler-runner/in-process-runner/InProcessRunner.js b/node_modules/serverless-offline/dist/lambda/handler-runner/in-process-runner/InProcessRunner.js
index 25b42ad..0d33ac9 100644
--- a/node_modules/serverless-offline/dist/lambda/handler-runner/in-process-runner/InProcessRunner.js
+++ b/node_modules/serverless-offline/dist/lambda/handler-runner/in-process-runner/InProcessRunner.js
@@ -163,7 +163,7 @@ class InProcessRunner {

     const {
       [_classPrivateFieldLooseBase(this, _handlerName)[_handlerName]]: handler
-    } = await Promise.resolve(\`\${_classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath]}\`).then(s => _interopRequireWildcard(require(s)));
+    } = await Promise.resolve(\`\${_classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath]}\`).then(s => import(\`\${s}.js\`));

     if (typeof handler !== 'function') {
       throw new Error(\`offline: handler '\${_classPrivateFieldLooseBase(this, _handlerName)[_handlerName]}' in \${_classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath]} is not a function\`);`
}

export const dockerIgnore = {
  name: '.dockerignore',
  content: `
.git
node_modules
*Dockerfile*
yarn.lock
package-lock.json
`
}

export const TEMPLATE_FILES = [
  app,
  factory,
  exampleLoginFn,
  packageJson,
  dockerfile,
  entrypoint,
  dockercompose,
  serverlessYml,
  patchesServerlessOffline,
  dockerIgnore
]
