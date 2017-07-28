import jsyaml from 'js-yaml';
import ini from 'ini';
import { readData, getType } from './reader';


const parser = {
  json: data => JSON.parse(data),
  yml: data => jsyaml.load(data),
  ini: data => ini.parse(data),
};

export default (dataPath) => {
  const data = readData(dataPath);
  const type = getType(dataPath);
  return parser[type](data);
};
