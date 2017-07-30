import lodash from 'lodash';

const renderPlainValue = value => (lodash.isObject(value) ? 'complex value' : value);

const plainRender = (data, parent) =>
  data.map((item) => {
    if (item.type === 'unchanged') return '';
    if (item.type === 'group') return plainRender(item.oldValue, `${item.key}.`);
    if (item.type === 'added') return `Property '${parent}${item.key}' was added with value: ${renderPlainValue(item.newValue)}`.concat('\n');
    if (item.type === 'removed') return `Property '${parent}${item.key}' was removed`.concat('\n');
    if (item.type === 'changed') return `Property '${parent}${item.key}' was updated. From '${item.oldValue}' to '${item.newValue}'`.concat('\n');
    return '';
  }).join('');

export default data => '\n'.concat(plainRender(data, ''));
