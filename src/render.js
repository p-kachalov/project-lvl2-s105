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

const renderData = (data, lvl) => {
  const renderValue = (value) => {
    if (lodash.isArray(value)) return renderData(value, lvl + 1);
    return value;
  };

  const template = {
    unchanged: item => `  ${indent(lvl)}${flag.unchanged} ${item.key}: ${renderValue(item.oldValue)}`,
    changed: item => `  ${indent(lvl)}${flag.added} ${item.key}: ${renderValue(item.newValue)}`.concat('\n').concat(`  ${indent(lvl)}${flag.removed} ${item.key}: ${renderValue(item.oldValue)}`),
    added: item => `  ${indent(lvl)}${flag.added} ${item.key}: ${renderValue(item.newValue)}`,
    removed: item => `  ${indent(lvl)}${flag.removed} ${item.key}: ${renderValue(item.oldValue)}`,
    group: item => `  ${indent(lvl)}${flag.unchanged} ${item.key}: ${renderValue(item.oldValue)}`,
  };

  const dataString = data.map(item => template[item.type](item)).join('\n');
  return '{\n'.concat(dataString).concat('\n').concat(`${indent(lvl)}}`);
};

const renderPlainValue = value => (lodash.isObject(value) ? 'complex value' : value);

const renderPlain = (data, parent) =>
  data.map((item) => {
    if (item.type === 'unchanged') return '';
    if (item.type === 'group') return renderPlain(item.oldValue, `${item.key}.`);
    if (item.type === 'added') return `Property '${parent}${item.key}' was added with value: ${renderPlainValue(item.newValue)}`.concat('\n');
    if (item.type === 'removed') return `Property '${parent}${item.key}' was removed`.concat('\n');
    if (item.type === 'changed') return `Property '${parent}${item.key}' was updated. From '${item.oldValue}' to '${item.newValue}'`.concat('\n');
    return '';
  }).join('');


export default (data, format) => {
  if (format === 'plain') return '\n'.concat(renderPlain(data, ''));
  return '\n'.concat(`${renderData(data, 0)}`).concat('\n');
};
