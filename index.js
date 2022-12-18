//'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('package.json');
let student = JSON.parse(rawdata);
console.log(student);
