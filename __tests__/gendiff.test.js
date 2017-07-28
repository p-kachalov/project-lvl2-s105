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

test('json->json to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.json')).toBe(result);
});

test('yml->yml to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.yml', './__tests__/fixtures/after.yml')).toBe(result);
});

test('json->yml to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.yml')).toBe(result);
});

test('yml->json to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.yml', './__tests__/fixtures/after.json')).toBe(result);
});
