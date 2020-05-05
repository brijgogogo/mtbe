const db = require("../db/productManufacturer");
const Router = require("@koa/router");
const logger = require("../utils/logger");
const responseHelper = require("./responseHelper");
const requestHelper = require("./requestHelper");
const router = new Router();
const bodyParser = require("koa-bodyparser");

// field=value

router.get("/", async (ctx) => {
  try {
    const options = requestHelper.parseQuery(ctx.request);
    const result = await db.getAll(options);
    if (result.error) {
      ctx.status = 404;
      ctx.body = result.error;
    } else {
      ctx.body = result;
    }
  } catch (error) {
    logger.error(error, "Query failure");
    ctx.status = 500;
    ctx.body = "Request failed!";
  }
});

router.get("/:id", async (ctx) => {
  const options = {
    ids: [ctx.params.id],
  };
  const values = await db.getAll(options);
  ctx.body = values;
});

router.post("/", bodyParser(), async (ctx) => {
  const options = ctx.request.body;
  const result = await db.add(options);
  responseHelper.sendAddResponse(ctx, result);
});

router.put("/", bodyParser(), async (ctx) => {
  const options = ctx.request.body;
  const result = await db.update(options);
  responseHelper.sendUpdateResponse(ctx, result);
});

router.delete("/:id", async (ctx) => {
  const options = {
    keys: [ctx.params.id],
  };
  const result = await db.delete(options);
  responseHelper.sendDeleteResponse(ctx, result);
});

module.exports = router;
