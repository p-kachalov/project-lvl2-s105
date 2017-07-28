import lodash from 'lodash';

export default (firstObject, secondObject) => {
  const keys = lodash.union(Object.keys(firstObject), Object.keys(secondObject));
  return keys.map((key) => {
    const oldValue = firstObject[key];
    const newValue = secondObject[key];
    if (oldValue === newValue) return { key, newValue, oldValue, type: 'nochanged' };
    if (oldValue && newValue) return { key, newValue, oldValue, type: 'changed' };
    if (oldValue) return { key, newValue, oldValue, type: 'deleted' };
    return { key, newValue, oldValue, type: 'added' };
  });
};
