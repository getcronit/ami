#!/bin/sh

if [ $# -ne 1 ]; then
  echo "Start as container" 1>&2
  exec yarn snek-functions server -f $LAMBDA_TASK_ROOT/dist
fi
export _HANDLER="$1"

RUNTIME_ENTRYPOINT=/var/runtime/bootstrap
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
  exec /usr/local/bin/aws-lambda-rie $RUNTIME_ENTRYPOINT
else
  exec $RUNTIME_ENTRYPOINT
fi
