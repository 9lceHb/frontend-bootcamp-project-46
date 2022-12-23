#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import { readJson, filesCompare } from '../src/utils.js';

const printFileDiff = (filepath1, filepath2) => {
  console.log(filesCompare(filepath1, filepath2));
};

const metaData = readJson(
  path.resolve(
    '/home/sergei/javascript_education/frontend-bootcamp-project-46/package.json',
  ),
);
program
  .name('gendiff')
  .description(metaData.description)
  .arguments('<filepath1> <filepath2>')
  .option('-f --format', 'get format of answer')
  .version(metaData.version)
  // .action(console.log(filesCompare(filepath1, filepath2)));
  .action(printFileDiff);

program.parse(process.argv);
