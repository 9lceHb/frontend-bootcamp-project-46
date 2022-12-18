//'use strict';

const fs = require('fs');

let Data = fs.readFileSync('package.json');
let metaData = JSON.parse(rawdata);
