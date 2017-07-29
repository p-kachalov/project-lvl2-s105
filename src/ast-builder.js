import lodash from 'lodash';

const buildAst = (firstObject, secondObject) => {
  const keys = lodash.union(Object.keys(firstObject), Object.keys(secondObject));
  const isValuesObjects = key =>
    lodash.isObject(firstObject[key]) || lodash.isObject(secondObject[key]);

  const isValuesEqual = key =>
    firstObject[key] === secondObject[key];

  const status = {
    wasRemoved: key =>
      lodash.has(firstObject, key) && !lodash.has(secondObject, key),

    wasAdded: key =>
      !lodash.has(firstObject, key) && lodash.has(secondObject, key),

    wasChanged: key =>
      lodash.has(firstObject, key) && lodash.has(secondObject, key) &&
      !(isValuesEqual(key) || isValuesObjects(key)),

    wasUnchanged: key =>
      (lodash.has(firstObject, key) && lodash.has(secondObject, key)) &&
      (isValuesEqual(key) && !(isValuesObjects(key))),
  };

  const makeNode = (key, type) => {
    if (type === 'group') {
      const oldValue = buildAst(firstObject[key], secondObject[key]);
      const newValue = buildAst(firstObject[key], secondObject[key]);
      return { key, newValue, oldValue, type };
    }
    if (type === 'removed') {
      const oldValue = lodash.isObject(firstObject[key]) ?
        buildAst(firstObject[key], firstObject[key]) : firstObject[key];
      return { key, newValue: oldValue, oldValue, type };
    }
    if (type === 'added') {
      const newValue = lodash.isObject(secondObject[key]) ?
        buildAst(secondObject[key], secondObject[key]) : secondObject[key];
      return { key, newValue, oldValue: newValue, type };
    }
    const newValue = secondObject[key];
    const oldValue = firstObject[key];
    return { key, newValue, oldValue, type };
  };

  return keys.map((key) => {
    if (status.wasRemoved(key)) return makeNode(key, 'removed');
    if (status.wasAdded(key)) return makeNode(key, 'added');
    if (status.wasChanged(key)) return makeNode(key, 'changed');
    if (status.wasUnchanged(key)) return makeNode(key, 'unchanged');
    return makeNode(key, 'group');
  });
};

export default buildAst;
