import parser from '../src/parsers.js';
import { getFixturePath } from '../src/utils.js';

test('parser', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file1.yaml');
  const obj = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parser(path1)).toEqual(obj);
  expect(parser(path2)).toEqual(obj);
});
