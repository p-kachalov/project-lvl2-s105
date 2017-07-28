import jsyaml from 'js-yaml';
import { readData, getType } from './reader';


const parser = {
  json: data => JSON.parse(data),
  yml: data => jsyaml.load(data),
};

export default (dataPath) => {
  const data = readData(dataPath);
  const type = getType(dataPath);
  return parser[type](data);
};
