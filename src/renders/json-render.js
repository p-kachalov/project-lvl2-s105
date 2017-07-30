
const indent = (lvl) => {
  if (lvl === 0) return '';
  const spaceCount = (lvl * 4);
  const makeIndent = (acc, count) => {
    if (count === 0) return acc;
    return makeIndent(acc.concat(' '), count - 1);
  };
  return makeIndent('', spaceCount);
};

const jsonRender = (data, lvl) => {
  const template = {
    unchanged: item => `${indent(lvl)}"${item.key}": "${item.type}",`,
    changed: item => `${indent(lvl)}"${item.key}": "${item.type}",`,
    added: item => `${indent(lvl)}"${item.key}": "${item.type}",`,
    removed: item => `${indent(lvl)}"${item.key}": "${item.type}",`,
    group: item => `${indent(lvl)}"${item.key}": ${jsonRender(item.oldValue, lvl + 1)},`,
  };

  const dataString = data.map(item => template[item.type](item)).join('\n');
  return '{\n'.concat(dataString).concat('\n').concat(`${indent(lvl - 1)}}`);
};

export default data => '\n'.concat(jsonRender(data, 1)).concat('\n');
