import program from 'commander';
import gendiff from './gendiff';

export default () => program
        .arguments('<firstConfig> <secondConfig>')
        .description('Compares two configuration files and shows a difference.')
        .option('-V, --version', 'output the version number')
        .option('-f, --format [type]', 'Output format')
        .action((first, second) => gendiff(first, second))
        .parse(process.argv);
