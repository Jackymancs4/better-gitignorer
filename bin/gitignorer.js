#!/usr/bin/env node

const program = require('commander')

const controllers = require('../lib/controllers')

program
  .version(require('../package.json').version)

program
  .command('init [name]')
  .description('Create .gitignore at current directory')
  .option('-f, --force', 'overwrite the existing .gitignore')
  .option('-g, --global', 'overwrite the existing .gitignore')
  .option('-p, --profile', 'overwrite the existing .gitignore')
  .option('-t, --template', 'overwrite the existing .gitignore')
  .action(controllers.init)

program
  .command('add [name]')
  .description('Create .gitignore at current directory')
  .option('-g, --global', 'overwrite the existing .gitignore')
  .option('-p, --profile', 'overwrite the existing .gitignore')
  .option('-t, --template', 'overwrite the existing .gitignore')
  .action(controllers.add)

program
  .command('profiles')
  .description('List all profiles and their corresponding files')
  .action(controllers.profiles)

program
  .command('templates')
  .description('List all profiles and their corresponding files')
  .option('-s, --src', 'overwrite the existing .gitignore')
  .option('-p, --pattern', 'overwrite the existing .gitignore')
  .action(controllers.templates)

program.parse(process.argv)

if (process.argv.length <= 2) {
  program.help()
}
