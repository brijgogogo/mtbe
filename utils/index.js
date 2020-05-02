const filterKeys = (obj, keys) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => keys.includes(key))
  );
};

const removeKeys = (obj, keys) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => !keys.includes(key))
  );
};

const filterValues = (arr, ...values) => {
  return arr.filter((e) => !values.includes(e));
};

module.exports = {
  filterKeys,
  removeKeys,
  filterValues,
};
