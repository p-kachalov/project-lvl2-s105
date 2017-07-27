

export default (data) => '\n{\n '.concat(`${data.map(item => item.toString()).join('\n ')}`).concat('\n}\n');
