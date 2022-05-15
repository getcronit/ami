FROM amazon/aws-lambda-nodejs:14

# Update coreutils to latest
RUN yum update -y
RUN yum install -y coreutils

# Install dependencies
RUN npm install
RUN npm install -g @snek-at/functions

# Show version of coreutils
RUN echo $(/usr/bin/env --version)

# Build snek-functions
RUN snek-functions build --functions-path .

# Copy function code
COPY package.json dist/* ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]
