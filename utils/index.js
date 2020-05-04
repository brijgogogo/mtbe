const logger = require("../utils/logger");

const keepKeys = (obj, keys) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => keys.includes(key))
  );
};

const removeKeys = (obj, keys) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => !keys.includes(key))
  );
};

const removeValues = (arr, ...values) => {
  return arr.filter((e) => !values.includes(e));
};

const keepValues = (arr, values) => {
  return arr.filter((e) => values.includes(e));
};

const reservedQueryKeys = [
  // query string
  "q", // search string
  "s", // field:a/d : sort
  "l", //<number> : pagination limit
  "o", //<number> : pagination skip/offset
  "f", //a,b,c : fields to get separated by comma
];

module.exports = {
  keepKeys,
  removeKeys,
  removeValues,
  keepValues,
  reservedQueryKeys,
};
