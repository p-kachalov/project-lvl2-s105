import fileToObject from './parser';
import buildDiffAst from './ast-builder';
import render from './render';

export default (firstFile, secondFile) => {
  const firstObject = fileToObject(firstFile);
  const secondObject = fileToObject(secondFile);

  const diffAst = buildDiffAst(firstObject, secondObject);
  return render(diffAst);
};
