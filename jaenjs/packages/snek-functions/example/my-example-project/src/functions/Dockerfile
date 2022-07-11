FROM node:16

LABEL description="This container serves as an entry point for our future Snek Function projects."
LABEL org.opencontainers.image.source="https://github.com/snek-at/origin"
LABEL maintainer="team@snek.at"

ENV LAMBDA_TASK_ROOT=/var/task \
    SNEK_FUNCTIONS_BUILD_DIR=/tmp/snek-functions

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=amazon/aws-lambda-nodejs:latest /usr/local/bin/aws-lambda-rie /usr/local/bin/aws-lambda-rie
COPY --from=amazon/aws-lambda-nodejs:latest /var/runtime /var/runtime
COPY --from=amazon/aws-lambda-nodejs:latest /var/lang /var/lang
COPY --from=amazon/aws-lambda-nodejs:latest lambda-entrypoint.sh .
COPY --from=amazon/aws-lambda-nodejs:latest /etc/pki/tls/certs/ca-bundle.crt /etc/pki/tls/certs/ca-bundle.crt
# Override /bin/sh because some scripts are only compatible with the amazon version
COPY --from=amazon/aws-lambda-nodejs:latest /bin/sh /bin/sh

# Add static files from . to task root
COPY package.json app.js entrypoint.sh ${LAMBDA_TASK_ROOT}/
# Copy all files form the . to the build dir
COPY ./ ${SNEK_FUNCTIONS_BUILD_DIR}/

RUN chmod +x entrypoint.sh

WORKDIR ${SNEK_FUNCTIONS_BUILD_DIR}

RUN ln -s /usr/local/bin/node /var/lang/bin/node ;\
    npm install ;\
    npx snek-functions build --functions-path . ;\
    # Copy the built functions to the lambda function
    cp -r dist node_modules ${LAMBDA_TASK_ROOT}

WORKDIR ${LAMBDA_TASK_ROOT}

ENTRYPOINT [ "./entrypoint.sh" ]

# Start in serverless mode
#CMD [ "app.handler" ]
