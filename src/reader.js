import fs from 'fs';
import path from 'path';

const readData = dataPath => fs.readFileSync(dataPath, 'utf-8');

const getType = dataPath => path.extname(dataPath).split('.')[1];

export default filePath => ({ data: readData(filePath), type: getType(filePath) });
