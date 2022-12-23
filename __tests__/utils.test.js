import { fileURLToPath } from 'url';
import path from 'path';
import { filesCompare, readJson } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('filesCompare', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const text = '  host: hexlet.io\n'
  + '- timeout: 50\n'
  + '+ timeout: 20\n'
  + '- proxy: 123.234.53.22\n'
  + '- follow: false\n'
  + '+ verbose: true';
  expect(filesCompare(path1, path2)).toEqual(text);
});

test('readJson', () => {
  const path1 = getFixturePath('file1.json');
  const obj = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(readJson(path1)).toEqual(obj);
});
