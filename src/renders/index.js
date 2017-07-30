import standartRender from './standart-render';
import plainRender from './plain-render';

const render = {
  plain: plainRender,
  json: data => `\n${JSON.stringify(data, null, ' ')}\n`,
  standart: standartRender,
};

export default (data, format = 'standart') => render[format](data);
