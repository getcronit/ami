#!/usr/bin/env -S node

import {Command} from 'commander'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

import * as commands from './commands/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const program = new Command()

const psjon = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../package.json'), 'utf8')
)

program
  .name('snek-functions')
  .description('Snek Functions CLI')
  .version(psjon.version)

program
  .command('server')
  .description('Start the functions server')
  .option('-p, --port <port>', 'Port to listen on', '4000')
  .option(
    '-f, --functions-path <path>',
    'Path to functions directory',
    './functions'
  )
  .option(
    '--watch',
    'Watch the functions folder and build on changes (Should be disabled for production)',
    false
  )

  .action(commands.server)

program
  .command('build')
  .description('Build the functions')
  .option(
    '-f, --functions-path <path>',
    'Path to functions directory',
    './functions'
  )
  .action(commands.build)

program
  .command('new')
  .description('Initialize a new functions directory')
  .arguments('<rootPath> [template]')
  .action(commands.new)

program
  .command('install')
  .description('Installs dependencies that are ignored by the client')
  .option('--cwd <path>', 'Path to the functions directory', '.')
  .arguments('[dependencies...]')
  .action(commands.install)

program.parse()
