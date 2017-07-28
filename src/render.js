const template = {
  nochanged: item => `  ${item.key}: ${item.oldValue}`,
  changed: item => `+ ${item.key}: ${item.newValue}`.concat('\n ').concat(`- ${item.key}: ${item.oldValue}`),
  added: item => `+ ${item.key}: ${item.newValue}`,
  deleted: item => `- ${item.key}: ${item.oldValue}`,
};

export default (data) => {
  const dataString = data.map(item => template[item.type](item)).join('\n ');
  return '\n{\n '.concat(dataString).concat('\n}\n');
};
