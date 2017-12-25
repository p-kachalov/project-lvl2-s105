import lodash from 'lodash';

const flag = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const indent = (lvl) => {
  if (lvl === 0) return '';
  const spaceCount = (lvl * 4);
  const makeIndent = (acc, count) => {
    if (count === 0) return acc;
    return makeIndent(acc.concat(' '), count - 1);
  };
  return makeIndent('', spaceCount);
};

const renderObject = (objectValue, lvl) => {
  const keys = Object.keys(objectValue);
  const resultString = keys.map((key) => {
    if (lodash.isObject(objectValue[key])) return renderObject(objectValue[key], lvl + 1);
    return `${indent(lvl)}    ${key}: ${objectValue[key]}`;
  }).join('\n');
  return `{\n${resultString}\n${indent(lvl)}}`;
};

const standartRender = (data, lvl) => {
  const renderValue = (value, type) => {
    if (type === 'nested') return standartRender(value, lvl + 1);
    return (lodash.isObject(value)) ? renderObject(value, lvl + 1) : value;
  };

  const makeReportString = (flagString, key, value, type) => `  ${indent(lvl)}${flagString} ${key}: ${renderValue(value, type)}`;

  const template = {
    unchanged: item => makeReportString(flag.unchanged, item.key, item.oldValue, item.type),
    changed: item => `${makeReportString(flag.added, item.key, item.newValue, item.type)}\n${makeReportString(flag.removed, item.key, item.oldValue, item.type)}`,
    added: item => makeReportString(flag.added, item.key, item.newValue, item.type),
    removed: item => makeReportString(flag.removed, item.key, item.oldValue, item.type),
    nested: item => makeReportString(flag.unchanged, item.key, item.children, item.type),
  };

  const dataString = data.map(item => template[item.type](item)).join('\n');
  return `{\n${dataString}\n${indent(lvl)}}`;
};

export default data => `\n${standartRender(data, 0)}\n`;
