export default (data) => {
  const dataString = data.map((item) => {
    if (item.flag === '+-') return `+ ${item.name}: ${item.value}`.concat('\n ').concat(`- ${item.name}: ${item.oldValue}`);
    return `${item.flag} ${item.name}: ${item.value}`;
  }).join('\n ');
  return '\n{\n '.concat(dataString).concat('\n}\n');
};
