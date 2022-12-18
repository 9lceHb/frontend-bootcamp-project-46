#!/usr/bin/env node
import { program } from 'commander';
// const program = require('commander');
// const fs = require('fs');
import * as fs from 'fs';
let data = fs.readFileSync('package.json');
let metaData = JSON.parse(data);

const command = (filepath1) => {
  console.log(filepath1);
};

program
  .name(metaData.name)
  .description(metaData.description)
  .arguments('<filepath1> <filepath2>')
  .option('-f --format', 'get format of answer')
  .version(metaData.version);

program.parse(process.argv);
