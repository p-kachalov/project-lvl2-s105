import fs from 'fs';
import path from 'path';

export const readData = dataPath => fs.readFileSync(dataPath, 'utf-8');

export const getType = dataPath => path.extname(dataPath).split('.')[1];
