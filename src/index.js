import fs from 'fs';
import path from 'path';
import parser from './parser';
import buildDiffAst from './ast-builder';
import render from './renders';

export default (firstFilePath, secondFilePath, format) => {
  const firstFileData = fs.readFileSync(firstFilePath, 'utf-8');
  const firstFileType = path.extname(firstFilePath).split('.')[1];

  const secondFileData = fs.readFileSync(secondFilePath, 'utf-8');
  const secondFileType = path.extname(secondFilePath).split('.')[1];

  const firstObject = parser(firstFileData, firstFileType);
  const secondObject = parser(secondFileData, secondFileType);

  const diffAst = buildDiffAst(firstObject, secondObject);
  return render(diffAst, format);
};
