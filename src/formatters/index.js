import _ from 'lodash';

const sortByKey = (key1, key2) => {
  const keyA = key1.toUpperCase(); // ignore upper and lowercase
  const keyB = key2.toUpperCase(); // ignore upper and lowercase
  if (keyA < keyB) {
    return -1;
  }
  if (keyA > keyB) {
    return 1;
  }
  return 0;
};

const stylish = (data) => {
  const indent = '  ';
  const iter = (currentData, nesting = 1) => {
    const newIndent = indent.repeat(nesting * 2 - 1);
    const commaIndent = indent.repeat(nesting * 2 - 2);
    if (Array.isArray(currentData)) {
      const newItems = currentData
        .sort((a, b) => sortByKey(a.keyR, b.keyR))
        .map(({ mark, keyR, value }) => {
          if (!_.isObject(value)) {
            return `${newIndent}${mark} ${keyR}: ${value}`;
          }
          return `${newIndent}${mark} ${keyR}: ${iter(value, nesting + 1)}`;
        });
      return `{\n${newItems.join('\n')}\n${commaIndent}}`;
    }
    // если не массив а словарь:
    const newItems = Object.entries(currentData)
      .sort((a, b) => sortByKey(a[0], b[0]))
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

const isUpdated = (currentData, key) => {
  const filtredData = currentData.filter((obj) => key === obj.keyR);
  if (filtredData.length === 2) {
    return filtredData.reduce((acc, obj) => {
      if (obj.mark === '+') {
        acc.valueTo = obj.value;
      } else {
        acc.valueFrom = obj.value;
      }
      return acc;
    }, {});
  }
  return false;
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
  if (mark === '+') {
    return `Property '${valuePath}' was added with value: ${isComplexOrStr(valueTo)}`;
  }
  if (mark === '-') {
    return `Property '${valuePath}' was removed`;
  }
  return null;
};

const plain = (data) => {
  const iter = (currentData, valuePath = '') => {
    let newItems = currentData
      .sort((a, b) => sortByKey(a.keyR, b.keyR))
      .map(({ mark, keyR, value }) => {
        const newValuePath = `${valuePath}${keyR}.`;
        if (!Array.isArray(value)) {
          if (isUpdated(currentData, keyR)) {
            const { valueTo, valueFrom } = isUpdated(currentData, keyR);
            const updated = true;
            return markToStr(mark, newValuePath.slice(0, -1), valueTo, valueFrom, updated);
          }
          return markToStr(mark, newValuePath.slice(0, -1), value);
        }
        return iter(value, newValuePath);
      })
      .filter((text) => text !== null);
    newItems = [...new Set(newItems)];
    return `${newItems.join('\n')}`;
  };
  return iter(data);
};

export { stylish, plain };
