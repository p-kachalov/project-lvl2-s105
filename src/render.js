import lodash from 'lodash';

const flag = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const renderData = (data) => {
  const renderValue = value => (lodash.isArray(value) ? renderData(value) : value);

  const template = {
    unchanged: item => `${flag.unchanged} ${item.key}: ${renderValue(item.oldValue)}`,
    changed: item => `${flag.added} ${item.key}: ${renderValue(item.newValue)}`.concat('\n ').concat(`${flag.removed} ${item.key}: ${renderValue(item.oldValue)}`),
    added: item => `${flag.added} ${item.key}: ${renderValue(item.newValue)}`,
    removed: item => `${flag.removed} ${item.key}: ${renderValue(item.oldValue)}`,
  };

  const dataString = data.map(item => template[item.type](item)).join('\n ');
  return '\n{\n '.concat(dataString).concat('\n}\n');
};

export default renderData;
