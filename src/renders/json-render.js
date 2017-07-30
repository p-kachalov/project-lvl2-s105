
const jsonRender = data => JSON.stringify(data, null, ' ');

export default data => '\n'.concat(jsonRender(data)).concat('\n');
