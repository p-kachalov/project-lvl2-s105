import program from 'commander';
import gendiff from './gendiff';
import { version, description } from '../package.json';

export default () => program
        .version(version)
        .arguments('<firstConfig> <secondConfig>')
        .description(description)
        .option('-f, --format [type]', 'Output format')
        .action((first, second) => gendiff(first, second))
        .parse(process.argv);
