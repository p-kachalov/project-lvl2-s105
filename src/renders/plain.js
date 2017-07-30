import lodash from 'lodash';

const renderPlainValue = value => (lodash.isObject(value) ? 'complex value' : value);

const plainRender = (data, path) =>
  data.map((item) => {
    const name = path.concat(item.key);
    if (item.type === 'unchanged') return '';
    if (item.type === 'nested') return plainRender(item.children, name);
    if (item.type === 'added') return `Property '${name.join('.')}' was added with value: ${renderPlainValue(item.newValue)}\n`;
    if (item.type === 'removed') return `Property '${name.join('.')}' was removed\n`;
    if (item.type === 'changed') return `Property '${name.join('.')}' was updated. From '${item.oldValue}' to '${item.newValue}'\n`;
    return '';
  }).join('');

export default data => `\n${plainRender(data, [])}`;
