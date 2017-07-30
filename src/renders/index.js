import standartRender from './standart';
import plainRender from './plain';

const render = {
  plain: plainRender,
  json: data => `\n${JSON.stringify(data, null, ' ')}\n`,
  standart: standartRender,
};

export default (data, format = 'standart') => render[format](data);
