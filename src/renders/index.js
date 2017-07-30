import standartRender from './standart-render';
import plainRender from './plain-render';
import jsonRender from './json-render';

const render = {
  plain: plainRender,
  json: jsonRender,
  standart: standartRender,
};

export default (data, format = 'standart') => render[format](data);
