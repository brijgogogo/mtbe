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

module.exports = {
  filterKeys,
  removeKeys,
};
