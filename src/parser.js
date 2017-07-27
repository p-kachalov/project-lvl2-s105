import fs from 'fs';

export default file => JSON.parse(fs.readFileSync(file));
