import standartRender from './standart';
import plainRender from './plain';
import jsonRender from './json';

const render = {
  plain: plainRender,
  json: jsonRender,
  standart: standartRender,
};

export default (data, format = 'standart') => render[format](data);
