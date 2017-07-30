import lodash from 'lodash';

const makeNode = (key, type, newValue, oldValue, children = []) =>
  ({ key, newValue, oldValue, type, children });

const isValuesObjects = (key, firstObject, secondObject) =>
    lodash.isObject(firstObject[key]) || lodash.isObject(secondObject[key]);

const isValuesEqual = (key, firstObject, secondObject) =>
  firstObject[key] === secondObject[key];

const status = {
  wasRemoved: (key, firstObject, secondObject) =>
    lodash.has(firstObject, key) && !lodash.has(secondObject, key),

  wasAdded: (key, firstObject, secondObject) =>
    !lodash.has(firstObject, key) && lodash.has(secondObject, key),

  wasChanged: (key, firstObject, secondObject) =>
    lodash.has(firstObject, key) && lodash.has(secondObject, key) &&
    !(isValuesEqual(key, firstObject, secondObject) ||
      isValuesObjects(key, firstObject, secondObject)),

  wasUnchanged: (key, firstObject, secondObject) =>
    (lodash.has(firstObject, key) && lodash.has(secondObject, key)) &&
    (isValuesEqual(key, firstObject, secondObject) &&
      !(isValuesObjects(key, firstObject, secondObject))),
};


const buildAst = (firstObject, secondObject) => {
  const keys = lodash.union(Object.keys(firstObject), Object.keys(secondObject));
  return keys.map((key) => {
    const newValue = secondObject[key];
    const oldValue = firstObject[key];
    if (status.wasRemoved(key, firstObject, secondObject)) return makeNode(key, 'removed', newValue, oldValue);
    if (status.wasAdded(key, firstObject, secondObject)) return makeNode(key, 'added', newValue, oldValue);
    if (status.wasChanged(key, firstObject, secondObject)) return makeNode(key, 'changed', newValue, oldValue);
    if (status.wasUnchanged(key, firstObject, secondObject)) return makeNode(key, 'unchanged', newValue, oldValue);
    return makeNode(key, 'nested', newValue, oldValue, buildAst(firstObject[key], secondObject[key]));
  });
};

export default buildAst;
