export declare const fn: <FunctionArgs, FunctionReturn>(snekFunction: (args: FunctionArgs, snekApi: import("@snek-at/snek-api-client").SnekApi, req: Request) => Promise<FunctionReturn | null>, options: {
    name: string;
}) => import("@snek-at/functions/dist/functions").SnekFunction<FunctionArgs, FunctionReturn>;
