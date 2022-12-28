import { filesCompare, getFixturePath } from '../src/utils.js';
import { stylish, plain } from '../src/formatters/index.js';
import parser from '../src/parsers.js';

const text1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
const text2 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const text3 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
test('filesCompare', () => {
  const data1 = parser(getFixturePath('file1.json'));
  const data2 = parser(getFixturePath('file2.json'));
  const data3 = parser(getFixturePath('file1.yaml'));
  const data4 = parser(getFixturePath('file2.yaml'));
  const data5 = parser(getFixturePath('file1_2.json'));
  const data6 = parser(getFixturePath('file2_2.json'));
  const data7 = parser(getFixturePath('file1_2.yaml'));
  const data8 = parser(getFixturePath('file2_2.yaml'));

  expect(stylish(filesCompare(data1, data2))).toEqual(text1);
  expect(stylish(filesCompare(data3, data4))).toEqual(text1);
  expect(stylish(filesCompare(data5, data6))).toEqual(text2);
  expect(stylish(filesCompare(data7, data8))).toEqual(text2);
  expect(plain(filesCompare(data5, data6))).toEqual(text3);
  expect(plain(filesCompare(data7, data8))).toEqual(text3);
});
