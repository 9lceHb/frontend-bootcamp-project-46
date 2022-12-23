#!/usr/bin/env node
import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import * as yaml from 'js-yaml';

const readJson = (filePath) => {
  const data = fs.readFileSync(path.resolve(filePath));
  if (filePath.extname === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

const filesCompare = (filepath1, filepath2) => {
  const data1 = readJson(filepath1);
  const data2 = readJson(filepath2);
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const keyIntersection = _.intersection(data1Keys, data2Keys);
  const key1Difference = _.difference(data1Keys, data2Keys);
  const key2Difference = _.difference(data2Keys, data1Keys);
  let result = [];
  const keyIntersectionResult = keyIntersection.map((key) => {
    if (data1[key] === data2[key]) {
      return [`  ${key}: ${data1[key]}`];
    }
    return [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
  });
  const key1DifferenceResult = key1Difference.map((key) => [
    `- ${key}: ${data1[key]}`,
  ]);
  const key2DifferenceResult = key2Difference.map((key) => [
    `+ ${key}: ${data2[key]}`,
  ]);
  result = [...keyIntersectionResult, ...key1DifferenceResult, ...key2DifferenceResult].flat();
  return result.join('\n');
};

export { readJson, filesCompare };