#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import _ from 'lodash';

const makeTreeObject = (type, mark, keyR, value = null, children = null) => ({
  type, mark, keyR, value, children,
});
const getType = (treeObject) => treeObject.type;
const getMark = (treeObject) => treeObject.mark;
const getKeyR = (treeObject) => treeObject.keyR;
const getChildren = (treeObject) => treeObject.children;
const getValue = (treeObject) => treeObject.value;

const checkValueType = (value) => {
  if (_.isObject(value)) {
    return 'object';
  }
  return 'leaf';
};

const filesCompare = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const keyIntersection = _.intersection(data1Keys, data2Keys);
  const key1Difference = _.difference(data1Keys, data2Keys);
  const key2Difference = _.difference(data2Keys, data1Keys);
  const keyIntersectionResult = keyIntersection.flatMap((key) => {
    if (_.isEqual(data1[key], data2[key])) {
      const treeObject = makeTreeObject(checkValueType(data1[key]), 'sameValues', key, data1[key], null);
      return [treeObject];
    }
    // Оба объекты и не равны
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const treeObject = makeTreeObject('tree', 'diffValues', key, null, filesCompare(data1[key], data2[key]));
      return [treeObject];
    }
    // Возвращает если кто - то не объект и были изменения
    const treeObject1 = makeTreeObject(checkValueType(data1[key]), 'valueChangeFrom', key, data1[key], null);
    const treeObject2 = makeTreeObject(checkValueType(data2[key]), 'valueChangeTo', key, data2[key], null);
    return [treeObject1, treeObject2];
  });
  const key1DifferenceResult = key1Difference.map((key) => {
    const treeObject = makeTreeObject(checkValueType(data1[key]), 'oldKeys', key, data1[key], null);
    return treeObject;
  });
  const key2DifferenceResult = key2Difference.map((key) => {
    const treeObject = makeTreeObject(checkValueType(data2[key]), 'newKeys', key, data2[key], null);
    return treeObject;
  });
  const result = [...keyIntersectionResult, ...key1DifferenceResult, ...key2DifferenceResult];
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
  filesCompare, getFixturePath, getChildren, getKeyR, getMark, getType, getValue,
};
// const path1 = getFixturePath('file1_2.json');
// const path2 = getFixturePath('file2_2.json');
// console.log(filesCompare(parser(path1), parser(path2)));
