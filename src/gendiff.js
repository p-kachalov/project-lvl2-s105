import fs from 'fs';

class Difference {
  constructor(name, value, flag = ' ') {
    this.name = name;
    this.value = value;
    this.flag = flag;
  }

  toString() {
    return `${this.flag} ${this.name}: ${this.value}`;
  }
}

const makeResultString = (data) => {
  const result = `
{
 ${data.map(item => item.toString()).join('\n ')}
}
`;
  return result;
};

const makeDiffList = (firstObject, secondObject) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);

  const firstChanged = firstKeys.reduce((acc, key) => {
    if (secondObject[key]) {
      if (firstObject[key] === secondObject[key]) {
        acc.push(new Difference(key, secondObject[key]));
        return acc;
      }
      acc.push(new Difference(key, secondObject[key], '+'));
      acc.push(new Difference(key, firstObject[key], '-'));
      return acc;
    }
    acc.push(new Difference(key, firstObject[key], '-'));
    return acc;
  }, []);

  return secondKeys.reduce((acc, key) => {
    if (firstObject[key]) return acc;
    acc.push(new Difference(key, secondObject[key], '+'));
    return acc;
  }, firstChanged);
};

const getType = filename => filename.split('.').pop();

const fileToObject = (file, type) => {
  if (type === 'json') return JSON.parse(fs.readFileSync(file));
  return {};
};

export default (firstFile, secondFile) => {
  const firstObject = fileToObject(firstFile, getType(firstFile));
  const secondObject = fileToObject(secondFile, getType(secondFile));

  const diffList = makeDiffList(firstObject, secondObject);

  const resultString = makeResultString(diffList);
  return resultString;
};
