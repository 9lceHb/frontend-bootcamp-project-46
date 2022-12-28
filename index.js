#!/usr/bin/env node
import { filesCompare } from './src/utils.js';
import { stylish, plain } from './src/formatters/index.js';
import parser from './src/parsers.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  if (formatter === 'stylish') {
    return stylish(filesCompare(parser(filepath1), parser(filepath2)));
  }
  if (formatter === 'plain') {
    return plain(filesCompare(parser(filepath1), parser(filepath2)));
  }
  return JSON.stringify(filesCompare(parser(filepath1), parser(filepath2)));
};
export default genDiff;
