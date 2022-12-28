#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import { filesCompare } from '../src/utils.js';
import { stylish, plain } from '../src/formatters/index.js';
import parser from '../src/parsers.js';

const printFileDiff = (filepath1, filepath2) => {
  if (program.opts().format === 'stylish') {
    console.log(stylish(filesCompare(parser(filepath1), parser(filepath2))));
  } else {
    console.log(plain(filesCompare(parser(filepath1), parser(filepath2))));
  }
};

const metaData = parser(
  path.resolve(
    '/home/sergei/javascript_education/frontend-bootcamp-project-46/package.json',
  ),
);
program
  .name('gendiff')
  .description(metaData.description)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'get format of answer', 'stylish')
  .version(metaData.version)
  // .action(console.log(filesCompare(filepath1, filepath2)));
  .action(printFileDiff);

program.parse(process.argv);
