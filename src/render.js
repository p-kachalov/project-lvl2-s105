import lodash from 'lodash';

const renderData = (data) => {
  const renderValue = value => (lodash.isArray(value) ? renderData(value) : value);

  const template = {
    unchanged: item => `  ${item.key}: ${renderValue(item.oldValue)}`,
    changed: item => `+ ${item.key}: ${renderValue(item.newValue)}`.concat('\n ').concat(`- ${item.key}: ${renderValue(item.oldValue)}`),
    added: item => `+ ${item.key}: ${renderValue(item.newValue)}`,
    removed: item => `- ${item.key}: ${renderValue(item.oldValue)}`,
  };

  const dataString = data.map(item => template[item.type](item)).join('\n ');
  return '\n{\n '.concat(dataString).concat('\n}\n');
};

export default renderData;
