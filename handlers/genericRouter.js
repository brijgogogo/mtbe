const Router = require("@koa/router");
const responseHelper = require("./responseHelper");
const requestHelper = require("./requestHelper");
const bodyParser = require("koa-bodyparser");

module.exports = function genericRouter(genericDb) {
  const router = new Router();

  router.get("/", async (ctx) => {
    const options = requestHelper.parseQuery(ctx.request);
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
    const result = await genericDb.delete(options);
    responseHelper.sendDeleteResponse(ctx, result);
  });

  return router;
};
