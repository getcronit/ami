#!/usr/bin/env node

import { Command } from "commander";
import server from "./commands/server";

const program = new Command();

program
  .name("snek-functions")
  .description("Snek Functions CLI")
  .version("0.1.0");

program
  .command("server")
  .description("Start the functions server")
  .option("-p, --port <port>", "Port to listen on", "4000")
  .option(
    "-f, --functions <path>",
    "Path to functions directory",
    "./functions"
  )
  .option(
    "-wf, --watch-functions",
    "Watch the functions folder and build on changes (Should be disabled for production)",
    false
  )

  .action(server);

program.parse();
