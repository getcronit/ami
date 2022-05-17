FROM node:16

ENV LAMBDA_TASK_ROOT=/var/task
ENV SNEK_FUNCTIONS_BUILD_DIR=/tmp/snek-functions

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=amazon/aws-lambda-nodejs:latest /usr/local/bin/aws-lambda-rie /usr/local/bin/aws-lambda-rie
COPY --from=amazon/aws-lambda-nodejs:latest /var/runtime /var/runtime
COPY --from=amazon/aws-lambda-nodejs:latest /var/lang /var/lang
COPY --from=amazon/aws-lambda-nodejs:latest lambda-entrypoint.sh .
COPY --from=amazon/aws-lambda-nodejs:latest /etc/pki/tls/certs/ca-bundle.crt /etc/pki/tls/certs/ca-bundle.crt
# Override /bin/sh because some scripts are only compatible with the amazon version
COPY --from=amazon/aws-lambda-nodejs:latest /bin/sh /bin/sh

RUN cp /usr/local/bin/node /var/lang/bin/node

# Add static files from . to task root
COPY package.json app.js ${LAMBDA_TASK_ROOT}/
# Copy all files form the . to the build dir
COPY ./ ${SNEK_FUNCTIONS_BUILD_DIR}/

WORKDIR ${SNEK_FUNCTIONS_BUILD_DIR}

RUN npm install
RUN npx snek-functions build --functions-path .
# Copy the built functions to the lambda function
RUN cp -r dist node_modules ${LAMBDA_TASK_ROOT}

WORKDIR ${LAMBDA_TASK_ROOT}

ENTRYPOINT [ "./lambda-entrypoint.sh" ]
CMD [ "app.handler" ]
