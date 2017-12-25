import lodash from 'lodash';

const renderPlainValue = value => (lodash.isObject(value) ? 'complex value' : value);

const plainRender = (data, path) =>
  data.map((item) => {
    const fullName = path.concat(item.key);
    switch (item.type) {
      case 'unchanged':
        return '';
      case 'nested':
        return plainRender(item.children, fullName);
      case 'added':
        return `Property '${fullName.join('.')}' was added with value: ${renderPlainValue(item.newValue)}\n`;
      case 'removed':
        return `Property '${fullName.join('.')}' was removed\n`;
      case 'changed':
        return `Property '${fullName.join('.')}' was updated. From '${item.oldValue}' to '${item.newValue}'\n`;
      default:
        return '';
    }
  }).join('');

export default data => `\n${plainRender(data, [])}`;
