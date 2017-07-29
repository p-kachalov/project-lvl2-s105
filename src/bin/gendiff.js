#!/usr/bin/env node
import program from 'commander';
import gendiff from '../';
import { version, description } from '../../package.json';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description(description)
  .option('-f, --format [type]', 'Output format')
  .action((first, second) => console.log(gendiff(first, second, program.format)))
  .parse(process.argv);
