const utils = require("../utils");
const logger = require("../utils/logger");

module.exports = {
  parseQuery: function (ctx) {
    const options = {};

    if (ctx.params && ctx.params.id) {
      options.ids = [ctx.params.id];
    }

    const req = ctx.request;

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

    if (typeof req.query.d != "undefined") {
      options.denormalized = parseInt(req.query.d);
    }

    // logger.info(req.query, "qs");

    options.conditions = utils.removeKeys(req.query, utils.reservedQueryKeys);

    // logger.info(options, "conditions");

    return options;
  },
};
