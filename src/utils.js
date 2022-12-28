#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import _ from 'lodash';

const filesCompare = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const keyIntersection = _.intersection(data1Keys, data2Keys);
  const key1Difference = _.difference(data1Keys, data2Keys);
  const key2Difference = _.difference(data2Keys, data1Keys);
  let result = [];
  const keyIntersectionResult = keyIntersection.flatMap((key) => {
    if (_.isEqual(data1[key], data2[key])) {
      return [{ mark: ' ', keyR: key, value: data1[key] }];
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return [{ mark: ' ', keyR: key, value: filesCompare(data1[key], data2[key]) }];
    }
    // Возвращает если кто - то не объект и были изменения
    return [{ mark: '-', keyR: key, value: data1[key] }, { mark: '+', keyR: key, value: data2[key] }];
  });
  const key1DifferenceResult = key1Difference.map((key) => ({ mark: '-', keyR: key, value: data1[key] }));
  const key2DifferenceResult = key2Difference.map((key) => ({ mark: '+', keyR: key, value: data2[key] }));
  // console.log(3, JSON.stringify(keyIntersectionResult, null, ' '));
  result = [...keyIntersectionResult, ...key1DifferenceResult, ...key2DifferenceResult];
  return result;
};

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

// const path3 = getFixturePath('file1_2.yaml');
// const path4 = getFixturePath('file2_2.yaml');
export {
  filesCompare, getFixturePath,
};
