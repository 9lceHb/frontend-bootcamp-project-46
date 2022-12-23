import * as fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

const parser = (filePath) => {
  const data = fs.readFileSync(path.resolve(filePath));
  if (path.extname(path.resolve(filePath)) === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};
export default parser;
