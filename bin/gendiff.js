#!/usr/bin/env node
import { program } from 'commander';
import { filesCompare } from '../src/utils.js';
import { stylish, plain } from '../src/formatters/index.js';
import parser from '../src/parsers.js';

const printFileDiff = (filepath1, filepath2) => {
  if (program.opts().format === 'stylish') {
    console.log(stylish(filesCompare(parser(filepath1), parser(filepath2))));
  } else if (program.opts().format === 'plain') {
    console.log(plain(filesCompare(parser(filepath1), parser(filepath2))));
  } else {
    console.log(JSON.stringify(filesCompare(parser(filepath1), parser(filepath2))));
  }
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'get format of answer', 'stylish')
  .version('1.0.0')
  // .action(console.log(filesCompare(filepath1, filepath2)));
  .action(printFileDiff);

program.parse();
