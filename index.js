// "use strict";

const Koa = require("koa");
const config = require("./config");
const logger = require("./utils/logger");
const routes = require("./routes");
const cors = require("@koa/cors");
const serve = require("koa-static");
const join = require("path").join;
const pino = require("koa-pino-logger");
const processHelper = require("./utils/processHelper");

logger.info("staring app");

const app = new Koa();
app.use(pino());

app.env = config.env;
logger.info(`env: ${app.env}`);

app.on("error", (err, ctx) => {
  logger.error({ err, ctx }, "server error");
});

const responseHeader = "X-Response-Time";

logger.info(config.whitelist, "cors-whitelist");

function checkOrigin(ctx) {
  const requestOrigin = ctx.accept.headers.origin;

  if (!config.whitelist.includes(requestOrigin)) {
    return ctx.throw(`${requestOrigin} is not valid origin`);
  }

  return requestOrigin;
}

app.use(
  cors({
    origin: checkOrigin,
  })
);

const publicDir = join(__dirname, "public");
app.use(serve(publicDir));

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get(responseHeader);
  ctx.log.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set(responseHeader, `${ms}ms`);
});

app.use(routes.routes());
app.use(routes.allowedMethods());

logger.info(`listening on port ${config.port}`);
const server = app.listen(config.port);

function stopServer() {
  logger.warn("server closing...");
  server.close(() => {
    logger.warn("server closed");
  });
}

processHelper.onExit(stopServer);

module.exports = server;
