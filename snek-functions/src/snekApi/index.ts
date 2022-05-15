import { SnekApi } from "./api";

const SNEK_API_URL =
  process.env.SNEK_API_URL ||
  // Gatsby needs a special prefix for its environment variables
  // See: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#accessing-environment-variables-in-the-browser
  process.env.GATSBY_SNEK_API_URL ||
  "https://api.snek.at";

export const snekApi = new SnekApi(SNEK_API_URL);
