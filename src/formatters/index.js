import _ from 'lodash';
import {
  getChildren, getKeyR, getMark, getType, getValue, // getFixturePath, filesCompare,
} from '../utils.js';
// import parser from '../parsers.js';

const symbolMatch = (mark) => {
  if (mark === 'sameValues' || mark === 'diffValues') {
    return ' ';
  }
  if (mark === 'valueChangeFrom' || mark === 'oldKeys') {
    return '-';
  }
  return '+';
};

const stylish = (data) => {
  const indent = '  ';
  const iter = (currentData, nesting = 1) => {
    const newIndent = indent.repeat(nesting * 2 - 1);
    const commaIndent = indent.repeat(nesting * 2 - 2);
    // если массив
    if (Array.isArray(currentData)) {
      const newItems = _.sortBy(currentData, ['keyR'])
        .map((objectTree) => {
          const symbol = symbolMatch(getMark(objectTree));
          const key = getKeyR(objectTree);
          const value = getValue(objectTree);
          const children = getChildren(objectTree);
          if (getType(objectTree) === 'leaf') {
            return `${newIndent}${symbol} ${key}: ${value}`;
          }
          // если тип дерево
          if (getType(objectTree) === 'tree') {
            return `${newIndent}${symbol} ${key}: ${iter(children, nesting + 1)}`;
          }
          // если тип объект
          return `${newIndent}${symbol} ${key}: ${iter(value, nesting + 1)}`;
        });
      return `{\n${newItems.join('\n')}\n${commaIndent}}`;
    }
    // если не массив а словарь:
    const newItems = _.sortBy(Object.entries(currentData), ['key'])
      .map(([keyR, value]) => {
        if (!_.isObject(value)) {
          return `${newIndent}${' '} ${keyR}: ${value}`;
        }
        return `${newIndent}${' '} ${keyR}: ${iter(value, nesting + 1)}`;
      });
    return `{\n${newItems.join('\n')}\n${commaIndent}}`;
  };
  return iter(data);
};

const getToAndFromValue = (currentData, key) => {
  const filtredData = currentData.filter((treeObj) => key === getKeyR(treeObj));
  return filtredData.reduce((acc, treeObj) => {
    if (getMark(treeObj) === 'valueChangeTo') {
      return { valueTo: treeObj.value, ...acc };
    }
    return { valueFrom: treeObj.value, ...acc };
  }, {});
};

const markToStr = (mark, valuePath, valueTo = '', valueFrom = '', updated = false) => {
  const isComplexOrStr = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };
  if (updated) {
    return `Property '${valuePath}' was updated. From ${isComplexOrStr(valueFrom)} to ${isComplexOrStr(valueTo)}`;
  }
  if (mark === 'newKeys') {
    return `Property '${valuePath}' was added with value: ${isComplexOrStr(valueTo)}`;
  }
  if (mark === 'oldKeys') {
    return `Property '${valuePath}' was removed`;
  }
  return null;
};

const plain = (data) => {
  const iter = (currentData, valuePath = '') => {
    const newItems = _.sortBy(currentData, ['keyR'])
      .map((objectTree) => {
        const key = getKeyR(objectTree);
        const value = getValue(objectTree);
        const children = getChildren(objectTree);
        const mark = getMark(objectTree);
        const newValuePath = `${valuePath}${key}.`;
        if (getType(objectTree) !== 'tree') {
          if (mark === 'valueChangeFrom' || mark === 'valueChangeTo') {
            const { valueTo, valueFrom } = getToAndFromValue(currentData, key);
            const updated = true;
            return markToStr(mark, newValuePath.slice(0, -1), valueTo, valueFrom, updated);
          }
          return markToStr(mark, newValuePath.slice(0, -1), value);
        }
        return iter(children, newValuePath);
      })
      .filter((text) => text !== null);
    const setItems = [...new Set(newItems)];
    return `${setItems.join('\n')}`;
  };
  return iter(data);
};

export { stylish, plain };

// const path1 = getFixturePath('file1_2.json');
// const path2 = getFixturePath('file2_2.json');
// console.log(plain(filesCompare(parser(path1), parser(path2))));
