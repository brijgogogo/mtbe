const utils = require("../../utils");

test("filter object keys", () => {
  const obj = {
    key1: 1,
    key2: 2,
    key3: 3,
  };

  const allowedKeys = ["key1", "key3"];

  const result = utils.keepKeys(obj, allowedKeys);
  expect(Object.keys(result).sort()).toEqual(allowedKeys.sort());
});

test("remove object keys", () => {
  const obj = {
    key1: 1,
    key2: 2,
    key3: 3,
    key4: 4,
  };

  const notRequiredKeys = ["key1", "key3"];

  const result = utils.removeKeys(obj, notRequiredKeys);
  const resultKeys = Object.keys(result);

  for (const k in notRequiredKeys) {
    expect(resultKeys.includes(k)).not.toBeTruthy();
  }
});
