const Router = require("@koa/router");
const responseHelper = require("./responseHelper");
const requestHelper = require("./requestHelper");
const bodyParser = require("koa-bodyparser");
const logger = require("../utils/logger");

module.exports = function genericRouter(genericDb) {
  const router = new Router();

  router.get("/", async (ctx) => {
    const options = requestHelper.parseQuery(ctx.request);
    logger.info(options, "get-all");
    const result = await genericDb.getAll(options);
    responseHelper.sendGetResponse(ctx, result);
  });

  router.get("/:id", async (ctx) => {
    const options = {
      ids: [ctx.params.id],
    };
    const values = await genericDb.getAll(options);
    ctx.body = values;
  });

  router.post("/", bodyParser(), async (ctx) => {
    const options = ctx.request.body;
    const result = await genericDb.add(options);
    responseHelper.sendAddResponse(ctx, result);
  });

  router.put("/", bodyParser(), async (ctx) => {
    const options = ctx.request.body;
    const result = await genericDb.update(options);
    responseHelper.sendUpdateResponse(ctx, result);
  });

  router.delete("/:id", async (ctx) => {
    const options = {
      keys: [ctx.params.id],
    };
    const result = await genericDb.softDelete(options);
    responseHelper.sendDeleteResponse(ctx, result);
  });

  router.post("/op/delete", bodyParser(), async (ctx) => {
    logger.info(ctx.request.body, "body");
    const options = {
      keys: ctx.request.body.keys,
    };
    const result = await genericDb.delete(options);
    responseHelper.sendDeleteResponse(ctx, result);
  });

  return router;
};
