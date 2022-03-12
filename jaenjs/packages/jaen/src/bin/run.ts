#!/usr/bin/node

import {Command} from 'commander'
const program = new Command()

import {runMigration} from '../services/migration/run-migration'

program.version('3.0.0')

program
  .command('build')
  .description('run build steps for jaen-pages')
  .option(
    '-m, --migration <url>',
    'jaen-pages migration (default: process.env.JAEN_MIGRATION_URL)',
    process.env.JAEN_MIGRATION_URL
  )
  .action(async options => {
    const JAEN_MIGRATION_URL = options.migration

    if (!JAEN_MIGRATION_URL) {
      console.error(
        '[jaen-pages] Failed to run migration -> Please specify a migration URL'
      )
      process.exit(1)
    }

    try {
      await runMigration(JAEN_MIGRATION_URL)
    } catch (err) {
      console.error(
        '[jaen-pages] Failed to run migration -> You must run this command inside your gatsby app!',
        err
      )
    }
  })

program.parse(process.argv)
