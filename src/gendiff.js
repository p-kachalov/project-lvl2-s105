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

const makeString = (data) => {
  const result = `
{
 ${data.map(item => item.toString()).join('\n ')}
}
`;
  return result;
};

export default (firstFile, secondFile) => {
  const firstJson = JSON.parse(fs.readFileSync(firstFile));
  const secondJson = JSON.parse(fs.readFileSync(secondFile));

  const firstKeys = Object.keys(firstJson);
  const secondKeys = Object.keys(secondJson);

  const firstChanged = firstKeys.reduce((acc, key) => {
    if (secondJson[key]) {
      if (firstJson[key] === secondJson[key]) {
        acc.push(new Difference(key, firstJson[key]));
        return acc;
      }
      acc.push(new Difference(key, secondJson[key], '+'));
      acc.push(new Difference(key, firstJson[key], '-'));
      return acc;
    }
    acc.push(new Difference(key, firstJson[key], '-'));
    return acc;
  }, []);

  const secondAdded = secondKeys.reduce((acc, key) => {
    if (firstJson[key]) return acc;
    acc.push(new Difference(key, secondJson[key], '+'));
    return acc;
  }, firstChanged);

  const resultString = makeString(secondAdded);
  return resultString;
};
