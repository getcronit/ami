FROM public.ecr.aws/lambda/nodejs:14

# Install dependencies
RUN npm install

# Build snek-functions
RUN snek-functions build --functions-path .

# Copy function code
COPY package.json node_modules dist/* ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]
