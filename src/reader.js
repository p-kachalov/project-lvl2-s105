import fs from 'fs';
import path from 'path';

export const readData = dataPath => fs.readFileSync(dataPath);

export const getType = dataPath => path.extname(dataPath).split('.')[1];
