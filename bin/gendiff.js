#!/usr/bin/env node
import { program } from 'commander';
// const program = require('commander');
// const fs = require('fs');
import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import * as yaml from 'js-yaml';

const readJson = (ppath) => {
  const data = fs.readFileSync(ppath);
  if (ppath.extname === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

const filesCompare = (filepath1, filepath2) => {
  const data1 = readJson(path.resolve(filepath1));
  const data2 = readJson(path.resolve(filepath2));
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const keyIntersection = _.intersection(data1Keys, data2Keys);
  const key1Difference = _.difference(data1Keys, data2Keys);
  const key2Difference = _.difference(data2Keys, data1Keys);
  let result = '';
  for (const key of keyIntersection) {
    if (data1[key] === data2[key]) {
      result += `  ${key}: ${data1[key]}\n`;
    } else {
      result += `- ${key}: ${data1[key]}\n`;
      result += `+ ${key}: ${data2[key]}\n`;
    }
  }
  for (const key of key1Difference) {
    result += `- ${key}: ${data1[key]}\n`;
  }
  for (const key of key2Difference) {
    result += `+ ${key}: ${data2[key]}\n`;
  }
  return result;
};

const printFileDiff = (filepath1, filepath2) => {
  console.log(filesCompare(filepath1, filepath2));
};

const metaData = readJson(
  path.resolve(
    '/home/sergei/javascript_education/frontend-bootcamp-project-46/package.json'
  )
);
program
  .name('gendiff')
  .description(metaData.description)
  .arguments('<filepath1> <filepath2>')
  .option('-f --format', 'get format of answer')
  .version(metaData.version)
  //.action(console.log(filesCompare(filepath1, filepath2)));
  .action(printFileDiff);

program.parse(process.argv);
