import jsyaml from 'js-yaml';
import ini from 'ini';

const parser = {
  json: data => JSON.parse(data),
  yml: data => jsyaml.load(data),
  ini: data => ini.parse(data),
};

export default (data, type) => parser[type](data);
