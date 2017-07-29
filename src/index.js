import reader from './reader';
import parser from './parser';
import buildDiffAst from './ast-builder';
import render from './render';

export default (firstFilePath, secondFilePath, format) => {
  const firstFile = reader(firstFilePath);
  const secondFile = reader(secondFilePath);

  const firstObject = parser(firstFile.data, firstFile.type);
  const secondObject = parser(secondFile.data, secondFile.type);

  const diffAst = buildDiffAst(firstObject, secondObject);
  return render(diffAst, format);
};
