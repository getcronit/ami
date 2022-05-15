import getServerlessApp from "../../../../../dist/getServerlessApp";

export async function handler(event: Object, context: Object) {
  return await getServerlessApp({ functions: "." })(event, context);
}
