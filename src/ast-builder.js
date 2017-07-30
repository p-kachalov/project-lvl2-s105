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
    if (type === 'nested') {
      const children = buildAst(firstObject[key], secondObject[key]);
      return { key, children, type };
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
    return makeNode(key, 'nested');
  });
};

export default buildAst;
