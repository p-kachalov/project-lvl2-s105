import lodash from 'lodash';

const renderPlainValue = value => (lodash.isObject(value) ? 'complex value' : value);

const plainRender = (data, path) =>
  data.map((item) => {
    const fullName = path.concat(item.key);
    if (item.type === 'unchanged') return '';
    if (item.type === 'nested') return plainRender(item.children, fullName);
    if (item.type === 'added') return `Property '${fullName.join('.')}' was added with value: ${renderPlainValue(item.newValue)}\n`;
    if (item.type === 'removed') return `Property '${fullName.join('.')}' was removed\n`;
    if (item.type === 'changed') return `Property '${fullName.join('.')}' was updated. From '${item.oldValue}' to '${item.newValue}'\n`;
    return '';
  }).join('');

export default data => `\n${plainRender(data, [])}`;
