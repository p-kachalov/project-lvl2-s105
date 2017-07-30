import lodash from 'lodash';

const renderPlainValue = value => (lodash.isObject(value) ? 'complex value' : value);

const plainRender = (data, path) =>
  data.map((item) => {
    if (item.type === 'unchanged') return '';
    if (item.type === 'nested') return plainRender(item.children, `${item.key}.`);
    if (item.type === 'added') return `Property '${path}${item.key}' was added with value: ${renderPlainValue(item.newValue)}`.concat('\n');
    if (item.type === 'removed') return `Property '${path}${item.key}' was removed`.concat('\n');
    if (item.type === 'changed') return `Property '${path}${item.key}' was updated. From '${item.oldValue}' to '${item.newValue}'`.concat('\n');
    return '';
  }).join('');

export default data => '\n'.concat(plainRender(data, ''));
