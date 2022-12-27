#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import { filesCompare, stylish } from '../src/utils.js';
import parser from '../src/parsers.js';

const printFileDiff = (filepath1, filepath2, formater = program.opts().format) => {
  if (formater.format === 'stylish') {
    console.log(stylish(filesCompare(parser(filepath1), parser(filepath2))));
  } else {
    console.log(formater);
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
