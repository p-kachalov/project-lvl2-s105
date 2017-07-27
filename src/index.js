import fileToObject from './parser';
import makeChangeList from './comparer';
import makeResultString from './render';

export default (firstFile, secondFile) => {
  const firstObject = fileToObject(firstFile);
  const secondObject = fileToObject(secondFile);

  const changeList = makeChangeList(firstObject, secondObject);
  const result = makeResultString(changeList);

  return result;
};
