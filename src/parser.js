import { readData, getType } from './reader';
import jsyaml from 'js-yaml';

const parser = {
  json: data => JSON.parse(data),
  yml: data => jsyaml.load(data),
};

export default (dataPath) => {
  const data = readData(dataPath);
  const type = getType(dataPath);
  console.log(type);
  return parser[type](data);
};
