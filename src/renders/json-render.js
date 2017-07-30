
const jsonRender = data => JSON.stringify(data, null, ' ');

export default data => `\n${jsonRender(data)}\n`;

