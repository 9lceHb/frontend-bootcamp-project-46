#!/usr/bin/env node
import { program } from 'commander';
// const program = require('commander');
// const fs = require('fs');
import * as fs from 'fs';
let data = fs.readFileSync('package.json');
let metaData = JSON.parse(data);

program
  .name(metaData.name)
  .description(metaData.description)
  .version(metaData.version);

program.parse();
