import program from 'commander';
import gendiff from './gendiff';
import setings from '../package.json';

export default () => program
        .version(setings.version)
        .arguments('<firstConfig> <secondConfig>')
        .description(setings.description)
        .option('-f, --format [type]', 'Output format')
        .action((first, second) => gendiff(first, second))
        .parse(process.argv);
