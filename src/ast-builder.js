import lodash from 'lodash';

export default (firstObject, secondObject) => {
  const keys = lodash.union(Object.keys(firstObject), Object.keys(secondObject));
  return keys.map((key) => {
    const oldValue = firstObject[key];
    const newValue = secondObject[key];
    if (oldValue === newValue) return { name: key, flag: ' ', value: oldValue };
    if (oldValue && newValue) return { name: key, flag: '+-', value: newValue, oldValue };
    if (oldValue) return { name: key, flag: '-', value: oldValue };
    return { name: key, flag: '+', value: newValue };
  });
};
