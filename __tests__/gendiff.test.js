import gendiff from 'gendiff-pk';

test('result gendiff to equal expected', () => {
  const result = `
{
   host: hexlet.io
 + timeout: 20
 - timeout: 50
 - proxy: 123.234.53.22
 + verbose: true
}
`;
  expect(gendiff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.json')).toBe(result);
});
