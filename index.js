// #!/usr/bin/env node

// import * as fs from 'fs';
// import _ from 'lodash';
// import path from 'path';

// const readJson = (filePath) => {
//   const data = fs.readFileSync(filePath);
//   return JSON.parse(data);
// };

// const filesCompare = (filepath1, filepath2) => {
//   const data1 = readJson(path.resolve(filepath1));
//   const data2 = readJson(path.resolve(filepath2));
//   const data1Keys = Object.keys(data1);
//   const data2Keys = Object.keys(data2);
//   const keyIntersection = _.intersection(data1Keys, data2Keys);
//   const key1Difference = _.difference(data1Keys, data2Keys);
//   const key2Difference = _.difference(data2Keys, data1Keys);
//   let result = '';
//   for (const key of keyIntersection) {
//     if (data1[key] === data2[key]) {
//       result += `  ${key}: ${data1[key]}\n`;
//     } else {
//       result += `- ${key}: ${data1[key]}\n`;
//       result += `+ ${key}: ${data2[key]}\n`;
//     }
//   }
//   for (const key of key1Difference) {
//     result += `- ${key}: ${data1[key]}\n`;
//   }
//   for (const key of key2Difference) {
//     result += `+ ${key}: ${data2[key]}\n`;
//   }
//   return result;
// };
// const filepath1 = './json-examples/file1.json';
// const filepath2 = './json-examples/file2.json';
// const datatt = readJson(path.resolve(filepath2));
// console.log(filesCompare(filepath1, filepath2));
