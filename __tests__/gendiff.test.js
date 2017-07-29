import gendiff from '../src';

const result = `
{
   host: hexlet.io
 + timeout: 20
 - timeout: 50
 - proxy: 123.234.53.22
 + verbose: true
}
`;

const resultNested = `
{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
`;

test('json->json to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.json')).toBe(result);
});

test('json->yml to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.yml')).toBe(result);
});

test('json->ini to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.ini')).toBe(result);
});


test('yml->yml to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.yml', './__tests__/fixtures/after.yml')).toBe(result);
});

test('yml->json to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.yml', './__tests__/fixtures/after.json')).toBe(result);
});

test('yml->ini to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.yml', './__tests__/fixtures/after.ini')).toBe(result);
});


test('ini->ini to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.ini', './__tests__/fixtures/after.ini')).toBe(result);
});

test('ini->json to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.ini', './__tests__/fixtures/after.json')).toBe(result);
});

test('ini->yml to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.ini', './__tests__/fixtures/after.yml')).toBe(result);
});
