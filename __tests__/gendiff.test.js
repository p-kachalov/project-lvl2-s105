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

const plainResult = `
Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with value: complex value
`;

const jsonResult = `
{
    "common": {
        "setting1": "unchanged",
        "setting2": "removed",
        "setting3": "unchanged",
        "setting6": "removed",
        "setting4": "added",
        "setting5": "added",
    },
    "group1": {
        "baz": "changed",
        "foo": "unchanged",
    },
    "group2": "removed",
    "group3": "added",
}
`;

test('result to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.json')).toBe(result);
  expect(gendiff('./__tests__/fixtures/before.yml', './__tests__/fixtures/after.yml')).toBe(result);
  expect(gendiff('./__tests__/fixtures/before.ini', './__tests__/fixtures/after.ini')).toBe(result);
  expect(gendiff('./__tests__/fixtures/before-nested.json', './__tests__/fixtures/after-nested.json')).toBe(resultNested);
  expect(gendiff('./__tests__/fixtures/before-nested.yml', './__tests__/fixtures/after-nested.yml')).toBe(resultNested);
  expect(gendiff('./__tests__/fixtures/before-nested.ini', './__tests__/fixtures/after-nested.ini')).toBe(resultNested);
});

test('plain json->json to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before-nested.json', './__tests__/fixtures/after-nested.json', 'plain')).toBe(plainResult);
});

test('json json->json to equal expected', () => {
  expect(gendiff('./__tests__/fixtures/before-nested.json', './__tests__/fixtures/after-nested.json', 'json')).toBe(jsonResult);
});
