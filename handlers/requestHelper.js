const utils = require("../utils");

module.exports = {
  parseQuery: function (req) {
    const options = {};

    if (typeof req.query.q != "undefined") {
      options.query = req.query.q;
    }

    if (typeof req.query.s != "undefined") {
      const values = req.query.s.split(":");
      options.sortBy = values[0];
      options.sortDirection =
        values.length > 1 && values[1].toLowerCase() === "d" ? "DESC" : "ASC";
    }

    if (typeof req.query.l != "undefined") {
      options.limit = req.query.l;
    }

    if (typeof req.query.o != "undefined") {
      options.offset = req.query.o;
    }

    if (typeof req.query.f != "undefined") {
      options.fields = req.query.f.split(",");
    }

    options.conditions = utils.removeKeys(req.query, utils.reservedQueryKeys);

    return options;
  },
};
