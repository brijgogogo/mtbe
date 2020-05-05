const logger = require("../utils/logger");

module.exports = {
  sendAddResponse: function (ctx, result) {
    if (result.errors) {
      this.sendValidationErrors(ctx, result.errors);
    } else {
      ctx.status = 201;
      ctx.body = { items: result.items };
    }
  },
  sendUpdateResponse: function (ctx, result) {
    if (result.errors && result.errors.length > 0) {
      this.sendValidationErrors(ctx, result.errors);
    } else {
      ctx.body = { items: result.items };
    }
  },
  sendValidationErrors: function (ctx, errors) {
    ctx.status = 422;
    ctx.body = { errors: errors };
  },
  sendDeleteResponse: function (ctx, result) {
    if (result && result.length > 0) {
      ctx.body = { items: result };
    } else {
      ctx.status = 404;
      ctx.body = "Key does not exist";
    }
  },
};
