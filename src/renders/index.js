import standartRender from './standart-render';
import plainRender from './plain-render';
import jsonRender from './json-render';

export default (data, format) => {
  if (format === 'plain') return plainRender(data);
  if (format === 'json') return jsonRender(data);
  return standartRender(data);
};
