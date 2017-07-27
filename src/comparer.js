import lodash from 'lodash';

class KeyStatus {
  constructor(name, flag, value, oldValue = '') {
    this.name = name;
    this.flag = flag;
    this.value = value;
    this.oldValue = oldValue;
  }

  toString() {
    if (this.flag === '+-') {
      return `+ ${this.name}: ${this.value}`.concat('\n ').concat(`- ${this.name}: ${this.oldValue}`);
    }
    return `${this.flag} ${this.name}: ${this.value}`;
  }
}

export default (firstObject, secondObject) => {
  const keys = lodash.union(Object.keys(firstObject), Object.keys(secondObject));
  return keys.map((key) => {
    const oldValue = firstObject[key];
    const newValue = secondObject[key];
    if (oldValue === newValue) return new KeyStatus(key, ' ', oldValue);
    if (oldValue && newValue) return new KeyStatus(key, '+-', newValue, oldValue);
    if (oldValue) return new KeyStatus(key, '-', oldValue);
    return new KeyStatus(key, '+', newValue);
  });
};
