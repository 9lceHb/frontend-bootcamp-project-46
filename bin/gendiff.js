#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';

const printFileDiff = (filepath1, filepath2) => {
  console.log(genDiff(filepath1, filepath2, program.opts().format));
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'get format of answer', 'stylish')
  .version('1.0.0')
  // .action(console.log(filesCompare(filepath1, filepath2)));
  .action(printFileDiff);

program.parse(process.argv);
