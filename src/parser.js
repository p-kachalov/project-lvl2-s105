import { readData, getType } from './reader';

const parser = {
  json: data => JSON.parse(data),
};

export default (dataPath) => {
  const data = readData(dataPath);
  const type = getType(dataPath);
  console.log(type);
  return parser[type](data);
};
