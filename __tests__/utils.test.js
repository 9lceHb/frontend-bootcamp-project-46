import { filesCompare, getFixturePath } from '../src/utils.js';

test('filesCompare', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const path3 = getFixturePath('file1.yaml');
  const path4 = getFixturePath('file2.yaml');
  const text = '  host: hexlet.io\n'
  + '- timeout: 50\n'
  + '+ timeout: 20\n'
  + '- proxy: 123.234.53.22\n'
  + '- follow: false\n'
  + '+ verbose: true';
  expect(filesCompare(path1, path2)).toEqual(text);
  expect(filesCompare(path3, path4)).toEqual(text);
});
