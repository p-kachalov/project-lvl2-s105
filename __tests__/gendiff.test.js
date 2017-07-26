import gendiff from '../src/gendiff';

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
expect(gendiff('./__tests__/test_data/before.json', './__tests__/test_data/after.json')).toBe(result);
});
