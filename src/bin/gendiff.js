#!/usr/bin/env node
import program from 'commander';
import gendiff from '../';
import { version, description } from '../../package.json';

const prog = () => program
        .version(version)
        .arguments('<firstConfig> <secondConfig>')
        .description(description)
        .option('-f, --format [type]', 'Output format')
        .action((first, second) => {
          const result = gendiff(first, second);
          console.log(result);
          return result;
        })
        .parse(process.argv);

prog();
